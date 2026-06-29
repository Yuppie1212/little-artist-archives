class Child < ApplicationRecord
  belongs_to :user
  has_one_attached :icon
  has_many :artworks, dependent: :destroy

  enum :gender, { not_specified: 0, male: 1, female: 2, other: 3 }

  validates :name, presence: true
  validates :birthday, presence: true
end
