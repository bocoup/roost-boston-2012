# Build that App

## Analyzing the app

(presentation)

## Configuring RequireJS

branch: configure-requirejs

branch includes: server, public dir, populated public/lib dir

- for now, just understand that server is serving public dir at /
- getting requirejs essentially working
  - script tag loading requirejs
  - data-main attribute points to /app/config
- create simple /app/config.js
- require.config
  - paths: jquery, text plugin, tests, backbone, underscore
  - deps
- shimming underscore, backbone
  - paths
  - shim
- load index.html -- does it work?


## Tests

branch: app-tests

branch includes: requirejs configuration, testing boilerplate files

We'll start by writing some basic tests for the various pieces of our app, specifically:

- sensors list
- sensor detail
- sensors collection

### Setup

- public/lib/test
  - chai, mocha, sinon
- test/index.html -- our "runner" -- server will serve it at /_test
- we'll use grunt-mocha to run our tests headless
- configure grunt-mocha in grunt.js

### What to test

We'll write a test, then write the code to make it pass.

- sensors list
  - Create a SensorsList view
  - Render the data
  - Render on new data
  - Render on data reset
  - Render on data add
  - Render on data change

- sensor detail
  - Create a SensorDetail view
  - Display sensor data
  - Update sensor data on model update

- sensors collection
  - Create a SensorsCollection
  - Ping the proper URL
  - Parse data returned by server
  - Update with new data

## Wiring it together

branch: integration

branch includes: everything but router, functional tests

- Router
  - index
  - sensor detail
  - controller

### Functional tests

branch: functional-tests

branch includes: everything but functional tests

- when everything is written, we can open it in the browser and see it working
- but what if we don't have to open the browser?
- chromedriver, capybara
