module Api
  module V1
    class ApiController < ActionController::API
      before_action :authenticate_user!

      protected

      def authenticate_user!
        client = request.headers['client']
        uuid = request.headers['uuid']
        token = request.headers['access-token']

        user = User.find_by(uuid: uuid)
      
        if user
          begin
            stored_token_hash = user.tokens[client]['token']
            if BCrypt::Password.new(stored_token_hash) == token
              sign_in(user)
              Rails.logger.debug("User signed in: #{user.inspect}")
            else
              Rails.logger.debug("トークンが一致しません")
              render json: { errors: ['ログアウトに失敗しました。'] }, status: :unprocessable_entity
            end
          rescue JSON::ParserError => e
            Rails.logger.error "トークンの解析に失敗しました: #{token}, エラー: #{e.message}"
            render json: { error: 'Invalid token' }, status: :unauthorized
          end
        else
          Rails.logger.error "トークンが見つかりません"
          render json: { error: 'Token missing' }, status: :unauthorized
        end
      end
    end
  end
end