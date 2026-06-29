class Artwork < ApplicationRecord
  belongs_to :child

  has_many_attached :photos

  validates :title, presence: true
  validates :drawn_at, presence: true
end
