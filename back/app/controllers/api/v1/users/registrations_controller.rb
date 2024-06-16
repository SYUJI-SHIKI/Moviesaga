module Api
  module V1
    class Users::RegistrationsController < DeviseTokenAuth::RegistrationsController
      skip_before_action :authenticate_user!, only: [:create]
      skip_before_action :verify_authenticity_token, only: [:create]
      before_action :configure_permitted_parameters, if: :devise_controller?
      before_action :configure_sign_up_params, only: %i[create]
    
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
