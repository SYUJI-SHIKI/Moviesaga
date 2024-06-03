class Movie < ApplicationRecord
  has_many :favorites, dependent: :destroy
  has_many :favorited_by_user, through: :favorites, source: :user
  has_many :movies_collections, dependent: :destroy
  has_many :collections, through: :movies_collections

  serialize :keywords, JSON

  # TMDB APIの規約により六か月以上キャッシュの保存ができないため
  scope :older_than_six_months, -> { where('created_at < ?', 6.months.ago) }

  def save_with_data(movie_data, video_id, keywords)
    Rails.logger.debug "Saving movie data: #{movie_data[:original_title]}"
    self.assign_attributes(
      tmdb_id: movie_data[:id],
      original_title: movie_data[:original_title],
      overview: movie_data[:overview],
      poster_path: movie_data[:poster_path],
      runtime: movie_data[:runtime],
      original_language: movie_data[:original_language],
      status: movie_data[:status],
      release_date: movie_data[:release_date],
      genres: movie_data[:genres],
      youtube_trailer_id: video_id.nil? ? nil : video_id.dig("id", "videoId"),
      keywords: keywords
    )
    save!
  end
end
