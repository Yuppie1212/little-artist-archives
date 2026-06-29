#!/bin/bash
set -e

# =====================================================
# little-artist-archives サーバーセットアップスクリプト
#
# 【使い方】
#   初回セットアップ時:
#     chmod +x setup.sh && ./setup.sh
#
#   git pull後の更新時:
#     ./setup.sh --update
# =====================================================

MODE=${1:-"setup"}

# .envファイルの確認
if [ ! -f .env ]; then
  echo "❌ .envファイルが存在しません。以下の内容で作成してください："
  echo ""
  echo "  db_user=your_db_user"
  echo "  db_password=your_db_password"
  echo "  db_name=your_db_name"
  echo ""
  exit 1
fi

# appディレクトリの確認（Railsアプリが格納される場所）
mkdir -p app

if [ "$MODE" = "--update" ]; then
  echo "=== [更新] コンテナを再起動します ==="

  # コンテナ停止
  docker compose --profile dev down

  # イメージ再ビルドと起動（entrypoint.shが bundle install / yarn install / db:migrate を自動実行）
  docker compose --profile dev up --build -d

  echo "✅ 更新完了！"
else
  echo "=== [初回セットアップ] 環境を構築します ==="

  # イメージビルドとコンテナ起動
  # entrypoint.sh が以下を自動実行する：
  #   - bundle install
  #   - yarn install
  #   - rails db:prepare（DB作成 + マイグレーション）
  #   - Rails サーバー起動
  docker compose --profile dev up --build -d

  echo "✅ セットアップ完了！ http://サーバーのIPアドレス でアクセスできます。"
fi
