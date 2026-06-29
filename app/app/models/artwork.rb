class Artwork < ApplicationRecord
  belongs_to :child

  has_one_attached :photo

  validates :title, presence: true
  validates :drawn_at, presence: true
end
