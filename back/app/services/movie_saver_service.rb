class MovieSaverService
  def self.save_movie(movie_data, video_id, keywords)
    Rails.logger.debug("Received movie_data: #{movie_data.inspect}")
    movie_data = movie_data.transform_keys(&:to_sym)
    movie = Movie.find_or_initialize_by(original_title: movie_data[:original_title])

    if movie.new_record?
      if movie.save_with_data(movie_data, video_id, keywords)
        Rails.logger.debug("Movie saved successfully: #{movie.inspect}")
      else
        Rails.logger.error("Failed to save movie: #{movie.errors.full_messages.join(', ')}")
      end
    else
      Rails.logger.debug("Movie already exists: #{movie.inspect}")
    end
    movie
  end
end