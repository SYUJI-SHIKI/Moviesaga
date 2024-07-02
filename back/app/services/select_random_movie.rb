class SelectRandomMovie
  include TranslateTextMethods
  include FetchMovieDataMethods

  BASE_URL = "https://api.themoviedb.org/3"
  API_KEY = Rails.application.credentials.api_key[:tmdb]

  def self.select_random_movie(language, selected_runtime, keyword, genre)
    movie_ids = language_filter(language, selected_runtime, keyword, genre)
    return nil if movie_ids.empty? || movie_ids.nil?

    movie_id = movie_ids.sample

    movie_id
  end

  def self.language_filter(language, selected_runtime, keyword, genre)
    page = 1
    movies = []
    max_pages = 30

    query_params = {
      api_key: API_KEY,
      include_adult: false,
      language: 'ja',
      sort_by: "popularity.desc",
    }
    if language == "ja"
      query_params[:'with_original_language'] = 'ja'
    end
    Rails.logger.debug("Language: #{language}, Selected Runtime: #{selected_runtime}, Keyword: #{keyword}")

    case selected_runtime
    when "under_110" then query_params[:'with_runtime.lte'] = 110
    when "over_111" then query_params[:'with_runtime.gte'] = 111
    else true
    end

    case keyword
    when "true_story" then query_params[:'with_keywords'] = 9672
    when "animation" then query_params[:'with_keywords'] = 210024
    else true
    end

    case genre
    when "action" then query_params[:'with_genres'] = 28
    when "comedy" then query_params[:'with_genres'] = 35
    when "mystery" then query_params[:'with_genres'] = 9648
    when "horror" then query_params[:'with_genres'] = 27
    when "romance" then query_params[:'with_genres'] = 10749
    else true
    end

      loop do
        query_params[:page] = page
        response = HTTParty.get("#{BASE_URL}/discover/movie", query: query_params)

        if response.success? 
          total_pages = response.parsed_response['total_pages']
          if language == "foreign"
            new_movies = response.parsed_response['results'].map do |movie|
              { id: movie['id'], original_language: movie['original_language'], }
            end
          else 
            new_movies = response.parsed_response['results'].map do |movie|
              { id: movie['id'] }
            end
          end
          movies.concat(new_movies)
          page += 1
          Rails.logger.debug("邦画はどうよ#{movies}")
          break if page > max_pages || page > total_pages
        else
          break
        end
      end

    if language == "foreign"
      movies = movies.reject { |movie| movie[:original_language] == "ja" } || movies
    end
    movies.map { |movie| movie[:id] }
  end
end