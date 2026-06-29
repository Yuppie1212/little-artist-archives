module Artworks
  class CreateService < ApplicationService
    def initialize(child:, params:)
      @child = child
      @params = params
    end

    def call
      artwork = @child.artworks.build(@params.except(:photos))
      attach_photos(artwork, @params[:photos])
      artwork.save ? success(artwork) : failure(artwork)
    end

    private

    def attach_photos(artwork, photos)
      return if photos.blank?
      Array(photos).reject(&:blank?).each { |p| artwork.photos.attach(p) }
    end
  end
end
