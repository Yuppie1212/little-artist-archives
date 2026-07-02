class Api::ArtworksController < Api::BaseController
  before_action :set_child
  before_action :set_artwork, only: [:show, :update, :destroy]

  # GET /api/children/:child_id/artworks
  def index
    artworks = @child.artworks.order(drawn_at: :desc)
    render json: { artworks: artworks.map { |a| serialize_artwork(a) } }
  end

  # GET /api/children/:child_id/artworks/:id
  def show
    render json: { artwork: serialize_artwork(@artwork) }
  end

  # POST /api/children/:child_id/artworks
  def create
    result = Artworks::CreateService.call(child: @child, params: artwork_params)
    if result.success?
      render json: { artwork: serialize_artwork(result.record) }, status: :created
    else
      render json: { errors: result.errors }, status: :unprocessable_entity
    end
  end

  # PATCH /api/children/:child_id/artworks/:id
  def update
    result = Artworks::UpdateService.call(artwork: @artwork, params: artwork_params)
    if result.success?
      render json: { artwork: serialize_artwork(result.record) }
    else
      render json: { errors: result.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /api/children/:child_id/artworks/:id
  def destroy
    @artwork.destroy!
    render json: { message: "作品を削除しました" }
  end

  private

  def set_child
    @child = current_user.children.find(params[:child_id])
  end

  def set_artwork
    @artwork = @child.artworks.find(params[:id])
  end

  def artwork_params
    params.require(:artwork).permit(
      :title, :drawn_at, :what_drawn, :why_drawn, :child_comment, :parent_memo,
      photos: []
    )
  end

  def serialize_artwork(artwork)
    {
      id:            artwork.id,
      title:         artwork.title,
      drawn_at:      artwork.drawn_at,
      what_drawn:    artwork.what_drawn,
      why_drawn:     artwork.why_drawn,
      child_comment: artwork.child_comment,
      parent_memo:   artwork.parent_memo,
      photos:        artwork.photos.map { |p| { signed_id: p.blob.signed_id, url: url_for(p) } },
      photo_urls:    artwork.photos.map { |p| url_for(p) },
      created_at:    artwork.created_at
    }
  end
end
