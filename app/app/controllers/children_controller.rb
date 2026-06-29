class ChildrenController < ApplicationController
  before_action :authenticate_user!
  before_action :set_child, only: [:show, :edit, :update, :destroy]

  def index
    @children = current_user.children.order(created_at: :desc)
  end

  def show
    @artworks = @child.artworks.order(drawn_at: :desc)
  end

  def new
    @child = Child.new
  end

  def create
    result = Children::CreateService.call(user: current_user, params: child_params)
    if result.success?
      redirect_to children_path, notice: "#{result.record.name}ちゃんを登録しました！"
    else
      @child = result.record
      render :new, status: :unprocessable_entity
    end
  end

  def edit; end

  def update
    result = Children::UpdateService.call(child: @child, params: child_params)
    if result.success?
      redirect_to @child, notice: "情報を更新しました！"
    else
      @child = result.record
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @child.destroy!
    redirect_to children_path, notice: "#{@child.name}ちゃんの情報を削除しました。"
  end

  private

  def set_child
    @child = current_user.children.find(params[:id])
  end

  def child_params
    params.require(:child).permit(:name, :birthday, :icon)
  end
end
