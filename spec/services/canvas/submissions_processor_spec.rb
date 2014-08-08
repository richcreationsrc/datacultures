require 'rails_helper'

RSpec.describe Canvas::SubmissionsProcessor, :type => :model do

  before(:all) do
    PointsConfiguration.delete_all
    PointsConfiguration.create({interaction: 'Submission', points_associated: 30, active: true, pcid: 'Foo' })
  end

  let(:submission_stream) do
    JSON.parse(File.read('spec/fixtures/submissions/submission_stream.json'))
  end

  let(:conf)           {  Rails.application.secrets['requests']                                    }
  let(:base_url)       {  conf['base_url']                                                         }
  let(:api_key)        {  conf['api_keys']['teacher']                                              }
  let(:request_object) {  Canvas::ApiRequest.new({base_url: base_url, api_key: api_key})           }

  let(:processor) do
    Canvas::SubmissionsProcessor.new({request_object: request_object})
  end

  context '#call' do

    context 'without valid parameters'  do

      it "does not register and Activity without a valid user_id" do
        submission_stream.first['user_id'] = nil
        expect{processor.call(submission_stream)}.to_not change{Activity.count}
      end
    end

    context  'with valid parameters' do
      it 'creates an Activity to track scoring if it has not been done so before'  do
        expect{processor.call(submission_stream)}.to change{Activity.count}.by(1)
      end

      it 'does not create an Activity for a submission if it has already been done.' do
        Activity.create({reason: 'Submission', delta: 7, canvas_user_id: 9, canvas_scoring_item_id: 3 })
        expect{processor.call(submission_stream)}.to_not change{Activity.count}
      end
    end

  end

 end

