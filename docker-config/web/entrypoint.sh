#!/bin/bash
set -e

# server.pidが残っている場合は削除してから起動
rm -f /app/tmp/pids/server.pid

# Gemfileが存在しない場合は新規Railsアプリを作成
if [ ! -f Gemfile ]; then
  echo "=== Railsアプリが見つかりません。新規作成します... ==="
  gem install rails --no-document
  rails new . -d postgresql --javascript esbuild --skip-git --force

  # React 18を追加（将来19へのアップグレード練習用）
  yarn add react@18 react-dom@18

  # esbuildのビルドスクリプトにJSXサポートを追加
  node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts.build = pkg.scripts.build + ' --jsx=automatic';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"
  echo "=== Railsアプリの作成が完了しました ==="
fi

# Gemのインストール
bundle install

# JavaScriptパッケージのインストール
yarn install

# データベースの作成・マイグレーション
bundle exec rails db:prepare

# esbuildウォッチャーをバックグラウンドで起動
yarn build --watch &

# Railsサーバーをフォアグラウンドで起動
exec bundle exec rails server -b 0.0.0.0 -p 3000