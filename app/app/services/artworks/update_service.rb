module Artworks
  class UpdateService < ApplicationService
    def initialize(artwork:, params:)
      @artwork = artwork
      @params = params
    end

    def call
      @artwork.assign_attributes(@params.except(:photos))
      replace_photos if @params[:photos].present?
      @artwork.save ? success(@artwork) : failure(@artwork)
    end

    private

    def replace_photos
      signed_ids = Array(@params[:photos]).reject(&:blank?)
      return if signed_ids.empty?

      # 送信された signed_id に対応する blob_id を取得
      new_blob_ids = signed_ids.filter_map do |sid|
        ActiveStorage::Blob.find_signed(sid)&.id
      end

      # 新しいリストに含まれない既存の添付ファイルのみ削除（ファイルも消す）
      current_blob_ids = @artwork.photos.map(&:blob_id)
      remove_ids = current_blob_ids - new_blob_ids
      if remove_ids.any?
        ActiveStorage::Attachment
          .where(record: @artwork, name: "photos", blob_id: remove_ids)
          .each(&:purge)
      end

      # 添付レコードをリセットして新しい順序で再登録
      ActiveStorage::Attachment.where(record: @artwork, name: "photos").delete_all
      signed_ids.each { |sid| @artwork.photos.attach(sid) }
    end
  end
end
