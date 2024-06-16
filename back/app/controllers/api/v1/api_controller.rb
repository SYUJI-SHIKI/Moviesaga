module Api
  module V1
    class ApiController < ActionController::API
      # before_action :authenticate_user!
      include DeviseTokenAuth::Concerns::SetUserByToken
      include DeviseHackSession
    end
  end
end