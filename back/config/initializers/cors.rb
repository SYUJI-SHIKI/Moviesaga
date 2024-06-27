Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '127.0.0.1:4000', 'localhost:4000', 'https://movie-saga-app.com', "https://moviesaga-syuzi-iidas-projects.vercel.app/"
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      expose: ['access-token', 'expiry', 'token-type', 'uid', 'client', 'uuid'],
      credentials: true
  end
end