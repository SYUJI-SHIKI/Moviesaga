class User < ApplicationRecord
  include FavoritableMethods
  include BookmarkableMethods
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable, :trackable and :omniauthable, omniauth_providers: %i[google_oauth2]
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable


  include DeviseTokenAuth::Concerns::User


  mount_uploader :avatar, AvatarUploader

  validates :name, presence: true, length: { maximum: 20 }

  has_many :favorites, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :collections, dependent: :destroy
  has_many :favorite_movies, through: :favorites, source: :movie
  has_many :bookmark_collections, through: :bookmarks, source: :collection

  def own?(object)
    object&.user_id == id
  end

  def self.from_auth(auth)
    uid = auth.uid

    user = User.find_or_create_by(uid: uid) do |new_user|
      new_user.uid = auth.uid
      new_user.name = auth.info.name
      new_user.email = auth.info.email
    end
    user
  end
end
