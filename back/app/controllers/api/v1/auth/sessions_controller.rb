module Api
  module V1
    class Auth::SessionsController < DeviseTokenAuth::SessionsController
      def create
        user = User.find_by(email: params[:email])
        if user && user.vaild_password?(params[:password])

          token = user.create_new_auth_token

          render json: {
            data: user.as_json.merge({
              access_token: token['access_token'],
              client: token['client'],
              uid: token['uid'],
            })
          }, status: :ok
        else
          render json: {error: 'Invaild email or password'}, status: :unauthorized
        end
      end
    end
  end
end