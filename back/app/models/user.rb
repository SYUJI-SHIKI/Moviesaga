class User < ApplicationRecord
  include FavoritableMethods
  include BookmarkableMethods
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable

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
end
