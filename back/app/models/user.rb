class User < ApplicationRecord
  include FavoritableMethods
  include BookmarkableMethods
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable, :trackable and 
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:google_oauth2]

  include DeviseTokenAuth::Concerns::User
  devise :omniauthable, omniauth_providers: [:google_oauth2]


  mount_uploader :avatar, AvatarUploader

  validates :name, presence: true, length: { maximum: 20 }, uniqueness: true
  validates :email, presence: true, uniqueness: true

  has_many :authentications, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :collections, dependent: :destroy
  has_many :favorite_movies, through: :favorites, source: :movie
  has_many :bookmark_collections, through: :bookmarks, source: :collection

  def own?(object)
    object&.user_id == id
  end

  def self.from_omniauth(payload, provider)
    transaction do
      user = find_by(email: payload["email"])
      if user.nil?
        user = User.new(
          name: payload["name"],
          email: payload["email"],
          provider: provider,
          uid: payload["sub"],
          uuid: SecureRandom.uuid
          )
        user.password = Devise.friendly_token[0, 20]

        if user.save
          user.authentications.create!(provider: provider, uid: payload["sub"])
          user
        else
          logger.error "保存できませんでした"
          nil
        end
      else
        user
      end
    rescue => e
      logger.error e
      nil
    end
  end
end
