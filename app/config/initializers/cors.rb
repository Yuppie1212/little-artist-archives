Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Vite 開発サーバーからのリクエストを許可
    origins "http://localhost:5173"

    resource "/api/*",
      headers:     :any,
      methods:     [:get, :post, :patch, :put, :delete, :options, :head],
      credentials: true  # Cookie（セッション）を送受信できるようにする
  end
end
