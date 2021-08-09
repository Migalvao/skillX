# == Schema Information
#
# Table name: match_requests
#
#  id                :bigint           not null, primary key
#  response_datetime :datetime
#  status            :integer          default("pending")
#  student_id        :bigint           not null
#  class_id          :bigint           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
class OwnRequestValidator < ActiveModel::Validator
  # To prevent a user from requesting a match of their own
  def validate(record)
    if record.student == record.skill_class.teacher
      record.errors.add :base, "The student and teacher must not be the same user"
    end
  end
end

class MatchRequest < ApplicationRecord
  belongs_to :student, class_name: 'User', foreign_key: 'student_id'
  belongs_to :skill_class, class_name: 'SkillClass', foreign_key: 'class_id'

  has_many :notifications, foreign_key: 'match_id'
  has_one :connection, foreign_key: 'match_id'

  # status [pending, accepted, refused, cancelled]
  enum status: {
    pending: 0,
    accepted: 1,
    refused: 2,
    cancelled: 3
  }

  validates_with OwnRequestValidator
  validates :response_datetime, presence: true, unless: :status_is_pending?

  def status_is_pending?
    return status == :pending.to_s
  end

end