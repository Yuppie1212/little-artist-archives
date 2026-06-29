module Children
  class UpdateService < ApplicationService
    def initialize(child:, params:)
      @child = child
      @params = params
    end

    def call
      @child.assign_attributes(@params.except(:icon))
      @child.icon.attach(@params[:icon]) if @params[:icon].present?
      @child.save ? success(@child) : failure(@child)
    end
  end
end
