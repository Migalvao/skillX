# == Schema Information
#
# Table name: skill_classes
#
#  id             :bigint           not null, primary key
#  title          :string
#  description    :text
#  no_classes     :integer
#  class_duration :integer
#  method         :integer
#  dificulty      :integer
#  regime         :integer
#  location       :string
#  archived       :boolean          default(FALSE)
#  teacher_id     :bigint           not null
#  skill_id       :bigint           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
require "test_helper"

class SkillClassTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end