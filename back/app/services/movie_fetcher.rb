require "google/cloud/translate/v2"

class MovieFetcher
  BASE_URL = "https://api.themoviedb.org/3"
  TMDB_API = Rails.application.credentials.api_key[:tmdb]

  def self.movie_data_detail(movie_id)
    movie_data = fetch_movie_data(movie_id, "ja")
    Rails.logger.debug("ttttttttttttttttttt#{movie_data}")
    if movie_data["overview"].nil? || movie_data["overview"].empty?
      movie_data = fetch_movie_data(movie_id, "en")
      translated_overview = translate_text(movie_data["overview"], "ja")
      movie_data["overview"] = "#{translated_overview}(＊英文を翻訳した内容なので表現に誤りがある場合があります)"
    end

    movie_data
  end

  def self.fetch_movie_data(movie_id, language)
    response = HTTParty.get("#{BASE_URL}/movie/#{movie_id}", query: {
      api_key: TMDB_API,
      language: language,
    })

    if response.success?
      movie_data = JSON.parse(response.body)
    else
      Rails.logger.error("Failed to fetch TMDB data: #{response.message}")
      nil
    end
  end

  def self.translate_text(text, change_language)
    translate = Google::Cloud::Translate::V2.new(
      project_id: ENV['GOOGLE_PROJECT_ID'],
      credentials: JSON.parse(File.read(ENV['GOOGLE_API'])),
    )

    translation = translate.translate text, to: change_language
    translation.text
  end
end