class Collection < ApplicationRecord
  belongs_to :user
  has_many :movies_collections, dependent: :destroy
  has_many :movies, through: :movies_collections, dependent: :destroy
end