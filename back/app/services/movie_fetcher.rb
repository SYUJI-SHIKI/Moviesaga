require "google/cloud/translate/v2"

class MovieFetcher
  BASE_URL = "https://api.themoviedb.org/3"

  def self.translate_text(text, change_language)
    translate = Google::Cloud::Translate::V2.new(
    project_id: ENV['GOOGLE_PROJECT_ID'],
    credentials:  Rails.application.credentials.api_key[:google],
    )

    translation = translate.translate text, to: change_language
    translation.text
  end

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
          translated_overview = translate_text(movie['overview'], "ja")
          movie['overview'] = "#{translated_overview}(＊英文を翻訳した内容なので表現に誤りがある場合があります)"    
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