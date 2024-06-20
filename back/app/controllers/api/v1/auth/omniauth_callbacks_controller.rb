module Api
  module V1
    class Auth::OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
      skip_before_action :authenticate_user!, only: [:google_oauth2]
      before_action :verify_authenticity_token, only: [:google_oauth2]

      def google_oauth2
        Rails.logger.debug ('通りましたよ')
        @omniauth = request.env["omniauth.auth"]
        @user = User.from_omniauth(@omniauth)

        if @user.persisted?
          token = @user.create_new_auth_token
          @user.save

          response_data = {
            data: user.as_json.merge({
              "access-token": token["access-token"],
              client: token['client'],
              uid: token['uid'],
            })
          }
          Rails.logger.info "Response Data: #{response_data.to_json}"
          render json: response_data, status: :ok
        else
          render json: {error: 'Invaild email or password'}, status: :unauthorized
        end
      end
    end
  end
end
