require "google/cloud/translate/v2"

module TranslateTextMethods
  extend ActiveSupport::Concern

  class_methods do
    def translate_text(text, change_language)
      translate = Google::Cloud::Translate::V2.new(
        project_id: Rails.application.credentials.api_key[:project_id],
        credentials: Rails.application.credentials.api_key[:google],
      )

      translation = translate.translate text, to: change_language
      translation.text
    end
  end
end