class MovieFetcher
  BASE_URL = "https://api.themoviedb.org/3"

  def self.fetch_movie_details(movie_id)
    api_key = ENV['TMDB_API']
    language = "ja"

    url = "#{BASE_URL}/movie/#{movie_id}?api_key=#{api_key}&language=#{language}"

    begin
      response = HTTParty.get(url)
      if response.success?
        movie = JSON.parse(response.body)
        if movie['overview'].nil? || movie['overview'].empty?
          url_en = "#{BASE_URL}/movie/#{movie_id}?api_key=#{api_key}&language=en"
          response_en = HTTParty.get(url_en)
          movie = JSON.parse(response_en.body) if response_en.success?
        end

        movie
      else
        Rails.logger.error("Failed to fetch movie details: #{response.message}")
        nil
      end
    rescue StandardError => e
      Rails.logger.error("Error fetching movie details: #{e.message}")
      nil
    end
  end
end