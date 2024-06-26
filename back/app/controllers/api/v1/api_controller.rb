module Api
  module V1
    class ApiController < ActionController::API
      # before_action :authenticate_user!

      private

      def authenticate_user!
        token = request.headers['Authorization']
        if token.present?
          # トークンを解析して対応するユーザーを見つける
          user = User.find_by("tokens @> ?::jsonb", { token => { "token" => token } }.to_json)
          if user
            # トークンが有効かどうか確認する
            token_data = user.tokens[token]
            if token_data && token_data["token"] == token
              # トークンが有効であれば、ユーザーをログインさせる
              sign_in(user)
            else
              Rails.logger.error "トークンが無効です: #{token}"
              render json: { error: 'Invalid token' }, status: :unauthorized
            end
          else
            Rails.logger.error "トークンに対応するユーザーが見つかりません: #{token}"
            render json: { error: 'User not found' }, status: :unauthorized
          end
        else
          Rails.logger.error "トークンが見つかりません"
          render json: { error: 'Token missing' }, status: :unauthorized
        end
      rescue JSON::ParserError
        Rails.logger.error "トークンの解析に失敗しました: #{token}"
        render json: { error: 'Invalid token' }, status: :unauthorized
      end
    end
  end
end