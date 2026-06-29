class ArtworksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_child
  before_action :set_artwork, only: [:show, :edit, :update, :destroy]

  def show; end

  def new
    @artwork = Artwork.new
  end

  def create
    result = Artworks::CreateService.call(child: @child, params: artwork_params)
    if result.success?
      redirect_to child_artwork_path(@child, result.record), notice: "作品を登録しました！"
    else
      @artwork = result.record
      render :new, status: :unprocessable_entity
    end
  end

  def edit; end

  def update
    result = Artworks::UpdateService.call(artwork: @artwork, params: artwork_params)
    if result.success?
      redirect_to child_artwork_path(@child, @artwork), notice: "作品を更新しました！"
    else
      @artwork = result.record
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @artwork.destroy!
    redirect_to @child, notice: "作品を削除しました。"
  end

  private

  def set_child
    @child = current_user.children.find(params[:child_id])
  end

  def set_artwork
    @artwork = @child.artworks.find(params[:id])
  end

  def artwork_params
    params.require(:artwork).permit(:title, :drawn_at, :what_drawn, :why_drawn, :child_comment, :parent_memo, photos: [])
  end
end
