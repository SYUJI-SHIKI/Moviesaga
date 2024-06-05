class FavoritesController < ApplicationController
  def create
    @movie = Movie.find(params[:movie_id])
    current_user.favorite(@movie)
  end

  def destroy
    @movie = current_user.favorites.find_by(params[:id]).movie
    current_user.unfavorite(@movie)
  end
end
