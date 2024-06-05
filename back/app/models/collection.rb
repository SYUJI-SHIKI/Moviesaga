class Collection < ApplicationRecord
  belongs_to :user
  has_many :movies_collections, dependent: :destroy
  has_many :movies, through: :movies_collections
  has_many :bookmarks, dependent: :destroy
  has_many :bookmarked_users, through: :bookmarks, source: :user

  validates :title, presence: true, uniqueness: true
  validate :must_one_movie

  private

  def must_one_movie
    if movies.empty?
      errors.add(:base, "映画を一つ以上選択してください")
    end
  end
end