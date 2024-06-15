module Api
  module V1
    class Users::OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
      def google_oauth2
        callback_for(:google)
      end
    
      def callback_for(provider)
        @omniauth = request.env["omniauth.auth"]
        user = User.find_oauth(@omniauth)
        if user.persisted?
          sign_in(user)

          # トークンを作る
          client_id = SecureRandom.urlsafe_base64(nil, false)
          token = SecureRandom.urlsafe_base64(nil, false)
          token_hash = BCrypt::Password.create(token)
          expiry = (Time.now + DeviseTokenAuth.token_lifespan).to_i

          user.tokens ||= {}
          user.tokens[client_id] = {
            token: token_hash,
            expiry: expiry
          }
          user.save!

          redirect_to "#{ENV['LOCAL_FRONT_URL']}/auth/callback?uid=#{user.uid}&client_id=#{client_id}&access_token=#{token}"
        else
          redirect_to "#{ENV['LOCAL_FRONT_URL']}/auth/failure"
        end
      end
    end
  end
end
