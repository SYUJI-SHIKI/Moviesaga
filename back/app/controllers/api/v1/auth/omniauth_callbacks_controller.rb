module Api
  module V1
    class Auth::OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
      skip_before_action :authenticate_user!, only: [:redirect_callbacks]
      skip_before_action :verify_authenticity_token, only: [:redirect_callbacks]
      require 'googleauth/id_tokens/verifier'
      # before_action :verify_g_csrf_token

      def redirect_callbacks
        params[:provider] = 'google_oauth2' if params[:provider] == ':provider'
        provider = params[:provider]
        Rails.logger.debug "Omniauth callback params: #{params[:credential].inspect}"
        token = params[:token]
        Rails.logger.debug("Received Google OAuth token: #{token}")

        # GoogleのOAuthトークンを検証してユーザー情報を取得する
        begin
          # user_info = authenticate_google_token(token)
          payload = Google::Auth::IDTokens.verify_oidc(token, aud: Rails.application.credentials.dig(:oauth, :google, :client_id))
        rescue => e
          Rails.logger.error("Google token verification failed: #{e.message}")
          render json: { error: 'Invalid token' }, status: :unauthorized
          return
        end

        @user = User.from_omniauth(payload, provider)

        if @user.persisted?
          @user.tokens.clear
          token = @user.create_new_auth_token
          @user.client = token['client']

          @user.save
          sign_in(:user, @user)

          # Rails.logger.debug("sssssssssssssssssssssssssss, #{token.inspect}")
          response_data = {
            data: @user.as_json.merge({
              "access-token": token["access-token"],
              client: token['client'],
              uuid: @user.uuid,
            })
          }
          Rails.logger.info "Response Data: #{response_data.to_json}"
          render json: response_data, status: :ok
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end
    end
  end
end