class MovieFetcher
  include TranslateTextMethods
  include FetchMovieDataMethods

  # 日本版あらすじがないと空の文字列が来ることがあるのでこの仕組みが必要
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
end