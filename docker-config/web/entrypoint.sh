#!/bin/bash
set -e

# server.pidが残っている場合は削除してから起動
rm -f /rails/tmp/pids/server.pid

# Gemのインストール（Gemfile変更時も自動反映）
bundle install

# JavaScriptパッケージのインストール（package.json変更時も自動反映）
yarn install

# データベースの作成・マイグレーション
bundle exec rails db:prepare

# Procfile.devに従ってRailsサーバーとesbuildウォッチャーを起動
exec bundle exec foreman start -f Procfile.dev
