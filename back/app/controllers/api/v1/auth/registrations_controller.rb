module Api
  module V1
    class Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
      skip_before_action :authenticate_user!, only: [:create]
      skip_before_action :verify_authenticity_token, only: [:create]
      before_action :configure_permitted_parameters, if: :devise_controller? 
      before_action :configure_sign_up_params, only: %i[create]
      after_action :set_token_info, only: [:create]

      include DeviseTokenAuth::Concerns::SetUserByToken
      include DeviseHackSession

      # def create
      #   Rails.logger.debug "#{resource} bbbbbbbbbbbbbbbbbbbbbbbbb"

      #   super do |resource|
      #     if resource.persisted?
      #       render json: {
      #         status: 'success',
      #         data: resource
      #       }, status: :created
      #     else
      #       render json: {
      #         status: 'error',
      #         errors: resource.errors.full_messages
      #       }, status: :unprocessable_entity
      #     end
      #   end
      # end

      protected

      def configure_permitted_parameters
        Rails.logger.debug "configure_permitted_parameters called"
        Rails.logger.debug "#{devise_parameter_sanitizer} sssssssssssssssss"
        
        devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
        devise_parameter_sanitizer.permit(:account_update, keys: [:name])
      #   # Rails.logger.debug "Parameters permitted for sign_up: #{devise_parameter_sanitizer.sanitize(:sign_up).inspect}"
      #   # # Rails.logger.debug "Parameters permitted for account_update: #{devise_parameter_sanitizer.sanitize(:account_update).inspect}"
      #   # permitted_params = devise_parameter_sanitizer.sanitize(:sign_up)
      #   # Rails.logger.debug "Parameters permitted for sign_up: #{permitted_params.inspect}"
      end

      def configure_sign_up_params
        devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :email, :password, :password_confirmation])
      end

      private

      def sign_up_params
        params.require(:registration).permit(:name, :email, :password, :password_confirmation)
      end

      def set_token_info
        return unless @resource.persisted?

        token = @resource.create_new_auth_token
        response.set_header('access-token', token['access-token'])
        response.set_header('client', token['client'])
      end
    end
  end
end