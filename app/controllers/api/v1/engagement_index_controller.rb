class Api::V1::EngagementIndexController < ApplicationController

  def index
    students = Student.all

    #get activities group by canvas_user_id and sum
    activity_sums = Activity.group(:canvas_user_id).sum(:delta)
    last_activity_dates = Activity.select(:canvas_updated_at, :canvas_user_id).group(:canvas_user_id).maximum(:canvas_updated_at)
    render :json => engagement_index_json(students, activity_sums, last_activity_dates)
  end

  private
    def engagement_index_json(students, student_points, last_activity_dates)
      students_array = []
      students.each do |student|
        student_hash = {}
        id = student[:canvas_user_id]
        student_hash[:id] = id
        student_hash[:name] = student[:name]
        student_hash[:sortable_name] = student[:sortable_name]
        student_hash[:points] = student_points[student[:canvas_user_id]]
        student_hash[:position] = 1
        student_hash[:section] = student[:section]
        student_hash[:share] = student[:share]
        student_hash[:last_activity_date] = last_activity_dates[id].to_time.strftime("%m-%d-%Y %l:%M %p")
        students_array << student_hash
      end
      engagement_index_json = {}
      engagement_index_json["students"] = students_array
      engagement_index_json["current_canvas_user_id"] = 9
      return engagement_index_json
    end
end
