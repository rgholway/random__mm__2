class Album < ApplicationRecord
  validates_presence_of :title

  has_many :songs
  belongs_to :artist
end
