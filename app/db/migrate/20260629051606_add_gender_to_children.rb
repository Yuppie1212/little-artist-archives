class AddGenderToChildren < ActiveRecord::Migration[8.1]
  def change
    add_column :children, :gender, :integer, default: 0, null: false
  end
end
