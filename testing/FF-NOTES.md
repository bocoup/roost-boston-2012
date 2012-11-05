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
    - searchResults.js\* ()
  - www/js/data/
    - search.js\* (search data)
  - www/js/
    - app.js (app model)
    - main.js (setup & brokering)
    - util.js (template loading)

### example: likes view

- what to test:
  - can we add a new like?
  - does it get added where we want it?
  - is the no results message removed?
- concepts:
  - setting up a qunit test harness
  - `module()`, `test()`
  - `ok()`, `equal()`
- implementation:
  - module definition
    - `new app.Likes( config );`

### example: search results

- what to test:
  - are results displayed correctly?
  - is no results case handled correctly?
  - do likes get set correctly?
- concepts:
  - fixture data
    - hard-coded
    - generated
  - mocks
  - spies
- challenges:
  - how to deal with likes, event delegation?
- implementation:

### example: search data

- what to test:
  - do we hit the right URL?
  - do we return a promise?
  - does the server response get processed correctly?
- concepts:
  - setup, teardown
  - ajax mocking
  - don't test the server!
- implementation

## automating

- grunt
- qunit config in grunt.js
- `grunt qunit`
- `grunt test` for qunit and jshint