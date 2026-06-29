class AddProfileToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :name, :string, null: false, default: ""
    add_column :users, :gender, :integer, null: false, default: 0
    add_column :users, :birthday, :date
  end
end
