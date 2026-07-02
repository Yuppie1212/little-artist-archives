class Api::Auth::RegistrationsController < ApplicationController
  protect_from_forgery with: :null_session

  # POST /api/auth/signup
  def create
    user = User.new(user_params)
    if user.save
      sign_in(user)
      render json: { user: serialize_user(user) }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :gender, :birthday)
  end

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
