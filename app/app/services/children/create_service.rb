module Children
  class CreateService < ApplicationService
    def initialize(user:, params:)
      @user = user
      @params = params
    end

    def call
      child = @user.children.build(@params.except(:icon))
      child.icon.attach(@params[:icon]) if @params[:icon].present?
      child.save ? success(child) : failure(child)
    end
  end
end
