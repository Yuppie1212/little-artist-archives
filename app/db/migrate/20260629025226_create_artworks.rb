class CreateArtworks < ActiveRecord::Migration[8.1]
  def change
    create_table :artworks do |t|
      t.references :child, null: false, foreign_key: true
      t.string :title, null: false
      t.datetime :drawn_at, null: false
      t.text :what_drawn
      t.text :why_drawn
      t.text :child_comment
      t.text :parent_memo

      t.timestamps
    end
  end
end
