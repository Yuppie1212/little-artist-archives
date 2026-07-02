class Api::ChildrenController < Api::BaseController
  before_action :set_child, only: [:show, :update, :destroy]

  # GET /api/children
  def index
    children = current_user.children.order(created_at: :desc)
    render json: { children: children.map { |c| serialize_child(c) } }
  end

  # GET /api/children/:id
  def show
    render json: { child: serialize_child(@child) }
  end

  # POST /api/children
  def create
    result = Children::CreateService.call(user: current_user, params: child_params)
    if result.success?
      render json: { child: serialize_child(result.record) }, status: :created
    else
      render json: { errors: result.errors }, status: :unprocessable_entity
    end
  end

  # PATCH /api/children/:id
  def update
    result = Children::UpdateService.call(child: @child, params: child_params)
    if result.success?
      render json: { child: serialize_child(result.record) }
    else
      render json: { errors: result.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /api/children/:id
  def destroy
    @child.destroy!
    render json: { message: "#{@child.name}ちゃんの情報を削除しました" }
  end

  private

  def set_child
    @child = current_user.children.find(params[:id])
  end

  def child_params
    params.require(:child).permit(:name, :birthday, :gender, :icon)
  end

  def serialize_child(child)
    {
      id:             child.id,
      name:           child.name,
      birthday:       child.birthday,
      gender:         child.gender,
      icon_url:       child.icon.attached? ? url_for(child.icon) : nil,
      artworks_count: child.artworks.count,
      created_at:     child.created_at
    }
  end
end
