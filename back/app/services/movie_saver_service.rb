class MovieSaverService
  def self.save_movie(movie_data, video_id)
    Rails.logger.debug("Received movie_data: #{movie_data.inspect}")
    movie = Movie.find_or_initialize_by(title: movie_data[:title])

    if movie.new_record?
      if movie.save_with_data(movie_data, video_id)
        Rails.logger.debug("Movie saved successfully: #{movie.inspect}")
      else
        Rails.logger.error("Failed to save movie: #{movie.errors.full_messages.join(', ')}")
      end
    else
      Rails.logger.debug("Movie already exists: #{movie.inspect}")
    end
  end
end