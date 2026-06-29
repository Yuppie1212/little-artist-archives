class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable

  enum :gender, { not_specified: 0, male: 1, female: 2, other: 3 }

  has_many :children, dependent: :destroy

  validates :name, presence: true
end
