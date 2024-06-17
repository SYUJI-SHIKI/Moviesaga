# module Api
#   module V1
#     class Auth::OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
#       def google_oauth2
#         redirect_to user_google_oauth2_omniauth_authorize_path
#       end
    
#       def callback_for(provider)
#         @omniauth = request.env["omniauth.auth"]
#         user = User.find_oauth(@omniauth)
#         if user.persisted?
#           sign_in(user)

#           # トークンを作る
#           client_id = SecureRandom.urlsafe_base64(nil, false)
#           token = SecureRandom.urlsafe_base64(nil, false)
#           token_hash = BCrypt::Password.create(token)
#           expiry = (Time.now + DeviseTokenAuth.token_lifespan).to_i

#           user.tokens ||= {}
#           user.tokens[client_id] = {
#             token: token_hash,
#             expiry: expiry
#           }
#           user.save!

#           authentication = user.authentications.find_or_create_by(provider: provider, uid: @omniauth.uid)
#           authentication.tokens ||= {}
#           authentication.tokens[client_id] = {
#             token: token_hash,
#             expiry: expiry
#           }
#           authentication.save!

#           redirect_to "#{ENV['LOCAL_FRONT_URL']}/auth/callback?uid=#{user.uid}&client_id=#{client_id}&access_token=#{token}"
#         else
#           redirect_to "#{ENV['LOCAL_FRONT_URL']}/auth/failure"
#         end
#       end
#     end
#   end
# end
