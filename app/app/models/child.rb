class Child < ApplicationRecord
  belongs_to :user
  has_one_attached :icon
  has_many :artworks, dependent: :destroy

  validates :name, presence: true
  validates :birthday, presence: true
end
