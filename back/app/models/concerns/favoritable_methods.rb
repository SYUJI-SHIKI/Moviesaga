module FavoritableMethods
  extend ActiveSupport::Concern

  def favorite(movie)
    favorite_movies << movie
  end

  def unfavorite(movie)
    favorite_movies.destroy(movie)
  end

  def favorite?(movie)
    movie.favorites.pluck(:user_id).include?(id)
  end
end