class MovieSaverService
  def self.save_movie(movie_data, video_id, keywords)
    movie_data = movie_data.transform_keys(&:to_sym)
    movie = Movie.find_or_initialize_by(original_title: movie_data[:original_title])

    if movie.new_record?
      handle_new_record(movie, movie_data, video_id, keywords)
    else
      handle_existing_record(movie, video_id)
    end

    movie
  end

  private

  def self.handle_new_record(movie, movie_data, video_id, keywords)
    if movie.save_with_data(movie_data, video_id, keywords)
      Rails.logger.debug("Movie saved successfully: #{movie.inspect}")
    else
      Rails.logger.error("Failed to save movie: #{movie.errors.full_messages.join(', ')}")
    end
  end

  def self.handle_existing_record(movie, video_id)
    if movie.youtube_trailer_id.nil? || movie.youtube_trailer_id.empty?
      Rails.logger.debug("ddddddddddddddddddddddd #{video_id}")
      movie.update(youtube_trailer_id: video_id["id"]["videoId"]) unless video_id.nil?
      Rails.logger.debug("Movie updated: #{movie.inspect}")
    else
      Rails.logger.debug("Movie already exists: #{movie.inspect}")
    end
  end
end