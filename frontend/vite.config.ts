import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // /api/* へのリクエストを Rails サーバーに転送
      '/api': {
        target: 'http://localhost',  // nginx 経由
        changeOrigin: true,
        // Cookie をそのまま転送する（セッション認証に必要）
      },
      // Active Storage の画像 URL も転送
      '/rails/active_storage': {
        target: 'http://localhost',
        changeOrigin: true,
      },
    },
  },
})
