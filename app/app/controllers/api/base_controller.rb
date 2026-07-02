class Api::BaseController < ApplicationController
  # APIはCSRFトークン不要（セッション自体は使う）
  protect_from_forgery with: :null_session

  before_action :require_login!

  rescue_from ActiveRecord::RecordNotFound do
    render json: { error: "見つかりませんでした" }, status: :not_found
  end

  private

  def require_login!
    render json: { error: "ログインが必要です" }, status: :unauthorized unless current_user
  end
end
