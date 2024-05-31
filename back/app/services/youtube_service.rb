require 'httparty'

class YoutubeService
  BASE_URL = "https://www.googleapis.com/youtube/v3/search"
  API_KEY =  Rails.application.credentials.api_key[:youtube]

  def self.search_videos(query)
    response = HTTParty.get(BASE_URL, query: {
      part: 'snippet',
      q: query,
      key: API_KEY,
      maxResults: 1,
    })

    if response.success?
      result = JSON.parse(response.body)
      first_video = result['items'].first
      first_video
    else
      Rails.logger.error("Failed to fetch YouTube data: #{response.message}")
      nil
    end
  end
end