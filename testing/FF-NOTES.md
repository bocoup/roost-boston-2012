# traditional code

- difficult to unit test -- why?
  - anonymous functions
  - hard-coded selectors
  - tightly coupled
  - no functions that take input & return output
- easy to integration test, but ...
  - integration tests are slow
  - they don't help with design
  - really just smoke tests

# what is a unit test?

- a test simply determines whether something is true
- myUnit.js -- a stupid simple test framework
  - everything else is just sugar!
- a test for fizzbuzz
- refactoring!

# how do we rethink traditional code?

- we can break our functionality into a few concepts
  - setup
  - presentation / user interaction
  - server communication
  - application state
  - brokering

- we can write different pieces using a few rules
  - constructors, not literals
  - configurable selectors
  - simple methods: input -> output
  - no anonymous functions
  - loosely coupled: single responsibility

# rewriting

- we'll break our code into a few pieces
  - views
    - likes.js
    - searchForm.js
    - searchResults.js
  - server communication
    - search.js
  - application state
    - model.js
  - setup & brokering (controller?)
    - app.js

- test first
  - aids in design
  - promotes loose coupling
  - you'll be surprised how well it works

## testing concepts

- basic test
  - input -> output
  - views/likes.js
- fixtures
  - views/searchResults.js
- mocks & spies
  - views/searchForm.js
  - model.js
- mocking ajax
  - data/search.js
- async
  - views/searchResults.js

# automating
