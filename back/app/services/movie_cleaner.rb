class MovieCleaner
  def self.clean_old_movies
    Movie.older_than_six_months.destroy_all
  end
end