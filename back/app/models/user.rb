class User < ApplicationRecord
  include Favoritable
  include Bookmarkable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable

  mount_uploader :avatar, AvatarUploader

  validates :name, presence: true, length: { maximum: 20 }

  has_many :bookmarks, dependent: :destroy
  has_many :bookmark_collections, through: :bookmarks, source: :collection
  has_many :favorites, dependent: :destroy
  has_many :favorite_movies, through: :favorites, source: :movie

  def own?(object)
    object&.user_id == id
  end
end
