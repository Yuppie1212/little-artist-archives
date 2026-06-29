module Artworks
  class CreateService < ApplicationService
    def initialize(child:, params:)
      @child = child
      @params = params
    end

    def call
      artwork = @child.artworks.build(@params.except(:photo))
      artwork.photo.attach(@params[:photo]) if @params[:photo].present?
      artwork.save ? success(artwork) : failure(artwork)
    end
  end
end
