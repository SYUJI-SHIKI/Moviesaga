module Api
  module V1
    class Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
      skip_before_action :authenticate_user!, only: [:create]
      skip_before_action :verify_authenticity_token, only: [:create]
      before_action :configure_permitted_parameters, if: :devise_controller? 
      before_action :configure_sign_up_params, only: %i[create]
      # after_action :set_token_info, only: [:create]

      include DeviseTokenAuth::Concerns::SetUserByToken
      include DeviseHackSession

      def create

        @user = resource_class.new(sign_up_params)

        @user.uuid = SecureRandom.uuid
        token = @user.create_new_auth_token
        @user.client = token['client']
        
        # Save the resource and handle the response
        if @user.save

          sign_in(:user, @user)

          Rails.logger.debug { "@resource.inspect: #{token.inspect}" }
          response_data = {
            data: @user.as_json.merge({
              "access-token": token['access-token'],
              client: token['client'],
              uuid: @user.uuid,
            })
          }

          Rails.logger.info "Response Data: #{response_data.to_json}"
          render json: response_data, status: :ok
        else
          render json: {
            status: 'error',
            errors: @user.errors.full_messages
          }, status: :unprocessable_entity
        end
      end

      protected

      def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
        devise_parameter_sanitizer.permit(:account_update, keys: [:name])
      end

      def configure_sign_up_params
        devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :email, :password, :password_confirmation])
      end

      private

      def sign_up_params
        params.require(:registration).permit(:name, :email, :password, :password_confirmation)
      end
    end
  end
end