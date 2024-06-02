class Collection < ApplicationRecord
  belongs_to :user
  has_many :movies_collections
  has_many :movies, through: :movies_collections, dependent: :destroy

  validates :title, presence: true, uniqueness: true
  validate :must_one_movie

  private

  def must_one_movie
    if movies.empty?
      errors.add(:base, "映画を一つ以上選択してください")
    end
  end
end