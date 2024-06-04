require "google/cloud/translate/v2"

module TranslateTextMethods
  extend ActiveSupport::Concern

  class_methods do
    def translate_text(text, change_language)
      translate = Google::Cloud::Translate::V2.new(
        project_id: ENV['GOOGLE_PROJECT_ID'],
        credentials: JSON.parse(File.read(ENV['GOOGLE_API'])),
      )

      translation = translate.translate text, to: change_language
      translation.text
    end
  end
end