class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable
  mount_uploader :avatar, AvatarUploader

  validates :name, presence: true, length: { maximum: 20 }

  has_many :collections, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :favorites_movies, through: :favorites, source: :movie

  def own?(object)
    object&.user_id == id
  end

  def favorite(movie)
    favorites_movies << movie
  end

  def unfavorite(movie)
    favorites_movies.destroy(movie)
  end

  def favorite?(movie)
    movie.favorites.pluck(:user_id).include?(id)
  end
  
end
