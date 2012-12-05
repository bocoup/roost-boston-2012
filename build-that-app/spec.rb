require 'rubygems'
require 'capybara/rspec'
require 'minitest/autorun'

Capybara.default_driver   = :selenium
Capybara.default_selector = :css

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

Capybara.app_host = 'http://localhost:4000'

class Srchr < MiniTest::Unit::TestCase
  include Capybara::DSL

  def setup
    visit('/')
  end

  def test_page
    assert page.has_content?('Sensors')
    assert page.has_content?('sensor-0')
    assert page.has_content?('sensor-1')
    assert page.has_content?('sensor-2')
    assert page.has_content?('sensor-3')
    assert page.has_content?('sensor-4')
  end

  def test_sensor_detail
    find('li[data-id="sensor-0"]').click
    assert_equal find('li[data-id="sensor-0"]').text, find('#sensor-detail h1').text
  end

  def test_sensor_detail_url
    visit('/sensors/sensor-1')
    assert_match 'sensor-1', find('#sensor-detail h1').text
  end

end