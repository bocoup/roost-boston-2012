# writing testable javascript

- installing the node dependencies: `npm install`
- starting the server: `node server`
- running the integration tests: `ruby spec/*.rb`
  - you'll need ruby, rubygems, and bundler

## traditional code

www/js/traditional.js

- difficult to unit test -- why?
  - anonymous functions
  - hard-coded selectors
  - tightly coupled
  - no functions that take input & return output
- easy to integration test, but ...
  - integration tests are slow
  - they don't help with design
  - really just smoke tests
  - [demo integration tests]

## what is a unit test?

- a test simply determines whether something is true
- www/lib/myUnit.js -- a stupid simple test framework
  - anything fancier is just sugar!
- a test for fizzbuzz
- refactoring!

## how do we rethink traditional code?

- we can break our functionality into a few concepts
  - presentation / user interaction
  - server communication
  - application state
  - setup & brokering

- we can write different pieces using a few guiding principles
  - constructors, not literals
  - configurable selectors
  - simple methods: input -> output
  - no anonymous functions
  - loosely coupled: single responsibility

## rewriting

- we are somewhat artificially not using a framework like backbone etc.

- test first
  - aids in design
  - promotes loose coupling
  - you'll be surprised how well it works

- we'll break our code into a few pieces
  - www/js/views/
    - likes.js\*
    - searchForm.js
    - searchResults.js\*
  - www/js/data/
    - search.js\*
  - www/js/
    - app.js (app model)
    - main.js (setup & brokering)
    - util.js (template loading)\*

### example: likes view

- can we add a new like?

### example: search results

- are results displayed correctly?
- is no results case handled correctly?
- do likes get set correctly?
- concepts:
  - fixture data
  - mocks
  - spies
- challenges:
  - how to deal with likes, event delegation?

### example: search data

- do we hit the right URL?
- do we return a promise?
- does the server response get processed correctly?
- concepts:
  - ajax mocking
  - don't test the server!

### example: template loading

- we still don't want to hit the server, so ...
  - generate template fixture
- do we hit the right URL?
- do we return a promise?
- does the response get processed correctly?
- concepts:
  - generated fixture

## automating

- grunt
- qunit config in grunt.js
- `grunt qunit`
- `grunt test` for qunit and jshint