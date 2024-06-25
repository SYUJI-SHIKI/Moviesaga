class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :movie

  validates :movie_id, presence: true
  validates :user_id, presence: true
  validates :user_id, uniqueness: { scope: :movie_id, message: "You have already favorited this movie" }
end