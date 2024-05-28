class MoviesCollections < ApplicationRecord
  belongs_to :collection
  belongs_to :movie
end