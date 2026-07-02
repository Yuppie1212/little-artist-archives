class Api::Auth::SessionsController < ApplicationController
  protect_from_forgery with: :null_session

  # POST /api/auth/login
  def create
    user = User.find_by(email: params[:email])
    if user&.valid_password?(params[:password])
      sign_in(user)
      render json: { user: serialize_user(user) }, status: :ok
    else
      render json: { error: "メールアドレスまたはパスワードが違います" }, status: :unauthorized
    end
  end

  # DELETE /api/auth/logout
  def destroy
    sign_out(current_user)
    render json: { message: "ログアウトしました" }, status: :ok
  end

  # GET /api/auth/me
  def me
    if current_user
      render json: { user: serialize_user(current_user) }, status: :ok
    else
      render json: { error: "ログインしていません" }, status: :unauthorized
    end
  end

  private

  def serialize_user(user)
    {
      id:       user.id,
      name:     user.name,
      email:    user.email,
      gender:   user.gender,
      birthday: user.birthday
    }
  end
end
