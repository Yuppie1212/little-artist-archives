class ChangeDrawnAtToDateInArtworks < ActiveRecord::Migration[8.1]
  def change
    change_column :artworks, :drawn_at, :date
  end
end
