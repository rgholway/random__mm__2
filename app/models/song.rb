class Song < ApplicationRecord
  validates_presence_of :name, :youtube

  belongs_to :album
end
