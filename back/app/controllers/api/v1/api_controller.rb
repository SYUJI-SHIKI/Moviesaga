module Api
  module V1
    class ApiController < ActionController::API
      # before_action :authenticate_user!
      # protect_from_forgery with: :null_session
      before_action :configure_permitted_parameters, if: :devise_controller?
      include DeviseTokenAuth::Concerns::SetUserByToken
      include DeviseHackSession

      protected

      def configure_permitted_parameters
        Rails.logger.debug "configure_permitted_parameters called"
        Rails.logger.debug "#{devise_parameter_sanitizer} sssssssssssssssss"
        devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
        devise_parameter_sanitizer.permit(:account_update, keys: [:name])
      end
    end
  end
end