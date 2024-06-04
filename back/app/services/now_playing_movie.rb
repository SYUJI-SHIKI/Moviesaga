class NowPlayingMovie
  include TranslateTextMethods
  include FetchMovieDataMethods

  BASE_URL = "https://api.themoviedb.org/3"
  API_KEY = Rails.application.credentials.api_key[:tmdb]

  def self.random_playing_movie(language: nil, selected_runtime: nil)
    movie_ids = language_filter(language, selected_runtime)
    return nil if movie_ids.empty? || movie_ids.nil?
    movie_data = runtime_filter(movie_ids, selected_runtime)
    return nil if movie_data.empty? || movie_data.nil?

    # 日本版あらすじがないと空の文字列が来ることがあるのでこの仕組みが必要
    if movie_data["overview"].nil? || movie_data["overview"].empty?
      movie_data = fetch_movie_data(movie_id, "en")
      translated_overview = translate_text(movie_data["overview"], "ja")
      movie_data["overview"] = "#{translated_overview}(＊英文を翻訳した内容なので表現に誤りがある場合があります)"
    end
    movie_data
  end

  def self.language_filter(language, selected_runtime)
    Rails.cache.fetch("language_filters_#{language}", expires_in: 1.day) do
      page = 1
      movies = []
      max_pages = 4

      loop do
        response = HTTParty.get("#{BASE_URL}/movie/now_playing", query: {
          api_key: API_KEY,
          language: 'ja',
          region: 'JP',
          page: page,
        })

        if response.success?
          new_movies = response.parsed_response['results'].map do |movie|
            {
              id: movie['id'],
              original_language: movie['original_language'],
            }
          end
          movies.concat(new_movies)
          page += 1
          Rails.logger.debug("時間かかってるねぇ#{movies}")
          break if page > max_pages
        else
          break
        end
      end

      if language == "ja"
        movies = movies.select! { |movie| movie[:original_language] == "ja" }
      else
        movies = movies.reject! { |movie| movie[:original_language] == "ja" }
      end

      movies.map { |movie| movie[:id] }
    end
  end

  # 時間指定がある場合、先ほどのレスポンスではruntimeが含まれないので必要
  def self.runtime_filter(movie_ids, selected_runtime)
    loop do
      Rails.logger.debug("はなしきこか#{movie_ids}")
      movie_id = movie_ids.sample
      movie_data = fetch_movie_data(movie_id, "ja")
      Rails.logger.debug("はなしきこか２#{movie_id}")
      if movie_data && match_runtime?(movie_data['runtime'], selected_runtime) == true        
        return movie_data
      else
        movie_ids.delete(movie_id)
        break if movie_ids.empty?
      end
    end
    movie_data
  end

  def self.match_runtime?(runtime, selected_runtime)
    Rails.logger.debug("ここに注目！！#{selected_runtime}")
    Rails.logger.debug("ここに注目！！#{runtime} (データ型: #{runtime.class})")
    case selected_runtime
    when "under_110"
      return runtime && runtime <= 110
      Rails.logger.debug("ここに注目#{runtime && runtime <= 110}")
    when "over_111"
      return runtime && runtime >= 111
    else
      true
    end
  end
end
