class Canvas::SubmissionsProcessor

  attr_accessor  :submission_conf, :request_object

  def initialize(conf)
    @submission_conf = PointsConfiguration.where({interaction: 'Submission'}).first
    @request_object     = conf[:request_object] || Canvas::ApiRequest.new({api_key: conf['api_key'], base_url: conf['base_url']})
  end

  def call(submissions)

    ## rewrite for return data from assignments API call
    scoring_submissions = Activity.where({reason: 'Submission'}).select(:canvas_scoring_item_id, :canvas_user_id)
    if scoring_submissions
      scored_submissions = scoring_submissions.map{|s| [s.canvas_scoring_item_id, s.canvas_user_id] }
    else
      scored_submissions = []
    end

    submissions.each do |submission|
      user_id    = submission['user_id']
      assignment_id = submission['assignment_id']
      attachment_urls = []
      if  submission['attachments']
        submission['attachments'].each do |attachment|
          attachment_urls << attachment['url']
        end
      end

      if user_id   && !(scored_submissions.include?([assignment_id, user_id]))
        Activity.score!({canvas_scoring_item_id: assignment_id,
                         canvas_user_id: user_id, reason: 'Submission',
                         body: attachment_urls.to_s,
                         score: submission_conf.active, delta: submission_conf.points_associated,
                         canvas_updated_at: submission['submitted_at'] })
      end
    end

  end

end
