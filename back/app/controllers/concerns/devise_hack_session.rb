module DeviseHackSession
  extend ActiveSupport::Concern

  class FakeSession < Hash
    def enabled?
      false
    end

    def destroy
    end
  end

  included do
    before_action :set_fake_session

    private

    def set_fake_session
      if Rails.configuration.respond_to?(:api_key) && Rails.configuration.api_only
        request.env["rake.session"] ||= ::DeviseHackSession::FakeSession.new
      end
    end
  end
end