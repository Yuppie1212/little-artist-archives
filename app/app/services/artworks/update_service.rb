module Artworks
  class UpdateService < ApplicationService
    def initialize(artwork:, params:)
      @artwork = artwork
      @params = params
    end

    def call
      @artwork.assign_attributes(@params.except(:photo))
      @artwork.photo.attach(@params[:photo]) if @params[:photo].present?
      @artwork.save ? success(@artwork) : failure(@artwork)
    end
  end
end
