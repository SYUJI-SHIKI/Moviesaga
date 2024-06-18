module Api
  module V1
    class Auth::SessionsController < DeviseTokenAuth::SessionsController
      skip_before_action :authenticate_user!, only: %i[create destroy]
      skip_before_action :verify_authenticity_token, only: %i[create destroy]

      def create
        user = User.find_by(email: params[:email])
        if user && user.valid_password?(params[:password])

          token = user.create_new_auth_token
          Rails.logger.info "Response Data: #{token}"

          response_data = {
            data: user.as_json.merge({
              "access-token": token['access-token'],
              client: token['client'],
              uid: token['uid'],
            })
          }
      
          # JSONレスポンスをログに出力
          Rails.logger.info "Response Data: #{response_data.to_json}"
      
          render json: response_data, status: :ok
        else
          render json: {error: 'Invaild email or password'}, status: :unauthorized
        end
      end

      def destroy
        Rails.logger.debug("リクエストヘッダー: #{request.headers.inspect}")
        client = request.headers['client']
        uid = request.headers['uid']
        token = request.headers['access-token']
      
        Rails.logger.debug("クライアント: #{client}, UID: #{uid}, トークン: #{token}")
      
        user = User.find_by(uid: uid)
        if user
          Rails.logger.debug("ユーザーが見つかりました: #{user.inspect}")
          Rails.logger.debug("ユーザーのトークン情報: #{user.tokens.inspect}")
      
          stored_token_hash = user.tokens[client]['token']
          if BCrypt::Password.new(stored_token_hash) == token
            user.tokens.delete(client)
            if user.save
              Rails.logger.debug("トークン削除後: #{user.tokens.inspect}")
              render json: { message: 'ログアウトしました。' }
            else
              Rails.logger.debug("ユーザーの保存に失敗: #{user.errors.full_messages}")
              render json: { errors: ['ログアウトに失敗しました。'] }, status: :unprocessable_entity
            end
          else
            Rails.logger.debug("トークンが一致しません")
            render json: { errors: ['ログアウトに失敗しました。'] }, status: :unprocessable_entity
          end
        else
          Rails.logger.debug("ユーザーが見つかりません")
          render json: { errors: ['ログアウトに失敗しました。'] }, status: :unprocessable_entity
        end
      end
    end
  end
end