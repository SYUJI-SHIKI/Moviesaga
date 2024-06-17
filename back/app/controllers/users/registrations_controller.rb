class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :configure_sign_up_params, only: %i[create]

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name])
    Rails.logger.debug "#{devise_parameter_sanitizer} sssssssssssssssss"
    Rails.logger.debug "#{devise_parameter_sanitizer.permit(:sign_up, keys: [:name])} sssssssssssssssss"
    Rails.logger.debug "#{devise_parameter_sanitizer.permit(:account_update, keys: [:name])} sssssssssssssssss"
  end

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end
