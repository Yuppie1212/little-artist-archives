class ApplicationService
  Result = Data.define(:success, :record, :errors) do
    def success? = success
    def failure? = !success
  end

  def self.call(...)
    new(...).call
  end

  private

  def success(record)
    Result.new(success: true, record: record, errors: [])
  end

  def failure(record)
    Result.new(success: false, record: record, errors: record.errors.full_messages)
  end
end
