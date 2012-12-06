#!/usr/bin/env ruby

require 'redcarpet'

contentFilename = ARGV[0]
resultFilename = ARGV[1]
templateFilename = ARGV[2] || "template.html"

if ( !contentFilename || !resultFilename )
  puts "Usage: "
  puts "./convert.rb from.md to.html"
  puts " - or if you want to specify a template file:"
  puts "./convert.rb from.md to.html template.html"
  exit
end


markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, {
  :autolink => true,
  :space_after_headers => true ,
  :fenced_code_blocks => true
})

to_render = ""
File.open(contentFilename, 'r') do |f1|
  while line = f1.gets
    to_render += line
  end
end
rendered = markdown.render( to_render )

template = ""
File.open(templateFilename, 'r') do |file_template|
        while line = file_template.gets
                template += line
        end
end

# Create a new file and write to it
File.open( resultFilename, 'w') do |f2|
     f2.puts template.sub('{{content}}', rendered )
end
