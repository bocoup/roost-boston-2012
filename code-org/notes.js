/*jshint strict:false */

// http://bit.ly/roost-code-org











// the most basic level of code organization is keeping our code
// isolated from other code. functions give us the ability to
// achieve this easily. for example, consider a JS file that
// contains this code:

var firstName = 'Rebecca';
var lastName = 'Murphey';

function say( msg ) {
  console.log( msg );
}

function sayHello() {
  say( 'Hello, ' + firstName + ' ' + lastName );
}

function sayGoodbye() {
  say( 'Goodbye, ' + firstName + ' ' + lastName );
}

$( document ).ready(function() {
  sayHello();
  setTimeout( sayGoodbye, 5000 );
});

// the problem with this code is that the two variables, as well as
// the functions sayHello and sayGoodbye -- are all in the "global
// namespace". any file that comes after this file can redefine them
// before our $(document).ready callback has a chance to fire.
// likewise, our own code might overwrite other definitions of these
// variables.

// we know that we can "close" variables inside a function, making
// them inaccessible to code outside the function:

function foo() {
  var bar = 'baz';
}

foo();
console.log( bar ); // ReferenceError: bar is not defined!



// so, we could make an "anonymous" function -- more accurately
// referred to as a function expression -- that closes all of our
// variables, and pass it to `$( document ).ready()`:

$( document ).ready(function() {
  var firstName = 'Rebecca';
  var lastName = 'Murphey';

  function say( msg ) {
    console.log( msg );
  }

  function sayHello() {
    say( 'Hello, ' + firstName + ' ' + lastName );
  }

  function sayGoodbye() {
    say( 'Goodbye, ' + firstName + ' ' + lastName );
  }

  sayHello();
  setTimeout( sayGoodbye, 5000 );
});

console.log( say ); // ReferenceError: say is not defined




// this is a fine solution for code that needs to run when the
// document is ready, but what about code that doesn't need to wait?
// we don't want to just throw it in the global namespace; we need a
// way to put it in a function, but we want to avoid having to give
// that function a name, because if we give it a name, it will claim
// a space in the global namespace.

// enter the IIFE, or "immediately invoked function expression." we
// can use an IIFE to keep "private" variables private, and only
// expose the code we want to expose in the global namespace -- for
// example, by claiming *one* spot on the global namespace that can
// act as the container for our application.
//
// http://benalman.com/news/2010/11/immediately-invoked-function-expression/

(function() {

}());



// create the application namespace if it's not already defined
window.myApp = window.myApp || {};

(function() {

  // define variables and functions that are "closed" by the IIFE
  var firstName = 'Rebecca';
  var lastName = 'Murphey';

  function say( msg ) {
    console.log( msg );
  }

  function sayHello() {
    say( 'Hello, ' + firstName + ' ' + lastName );
  }

  function sayGoodbye() {
    say( 'Goodbye, ' + firstName + ' ' + lastName );
  }

  // expose only what we need to expose
  window.myApp.sayHello = sayHello;
  window.myApp.sayGoodbye = sayGoodbye;
}());

$( document ).ready(function() {
  window.myApp.sayHello();
  setTimeout( window.myApp.sayGoodbye, 5000 );
});

function foo() {
  return 'bar';
}

var myVar = foo();




// IIFEs let us do other interesting things too -- since functions
// can return values, we can use an IIFE to define an object that we
// assign to a variable, while giving that object privileged access
// to variables defined inside of the IIFE. This is the basis of the
// module pattern.
//
// http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth

var myApp = window.myApp = window.myApp || {};

// define our module
myApp.SecretMessage = (function() {
  // a private variable that can't be accessed or
  // changed from outside of the module
  var secretMessages = [
    "Don't eat the yellow snow",
    "Tacocat rides at midnight",
    "Able was I ere I saw Elba"
  ];

  // a private function
  function getRandom( arr ) {
    return arr[ Math.floor( Math.random() * arr.length ) ];
  }

  // a public module with a method that accesses the
  // private variable
  return {
    say: function() {
      console.log( getRandom( secretMessages ) );
    },
    addSecretMessage: function( msg ) {
      secretMessages.push( msg );
    }
  };
}());

// use our module's public method
$( document ).ready( myApp.SecretMessage.say );




// we can use the module pattern to define more than just simple
// objects; it becomes even more powerful when we use it to define a
// "constructor". constructors let us make multiple instances of the
// same kind of object, which is invaluable when it comes to
// testability.

var myApp = window.myApp = window.myApp || {};

// define our module
myApp.Person = (function() {
  var Person = function( firstName, lastName ) {
    this.firstName = firstName;
    this.lastName = lastName;
  };

  Person.prototype.introduce = function() {
    console.log( 'My name is ' + this.firstName + ' ' + this.lastName );
  };

  return Person;
}());

$( document ).ready(function() {
  var r = new myApp.Person( 'Rebecca', 'Murphey' );
  var j = new myApp.Person( 'Jory', 'Burson' );

  r.introduce();
  j.introduce();
});





// before we go much further, let's take a quick diversion for a sec
// to talk about objects and prototypes. an object is a data
// structure of key/value pairs; keys are strings, and values can be
// anything: strings, booleans, arrays, functions, even other
// objects. when the value is a function, it is referred to as a
// *method of the object*. when the value is anything else, it is
// referred to as a *property of the object*.
//
// here's a simple example of an object:

var developerBen = {
  firstName: 'Ben',
  lastName: 'Alman',
  introduce: function( greet ) {
    console.log( greet, this.firstName, this.lastName );
  }
};

developerBen.introduce( 'Hello,' ); // Hello, Ben Alman



// we might have another developer in our application, too:

var developerDan = {
  firstName: 'Dan',
  lastName: 'Heberden'
};



// ## call and apply
//
// we could be clever and use developerBen's introduce method to
// introduce developerDan, as well, via call and apply:

developerBen.introduce.call( developerDan, 'Yo!', 'Hi', 'NO really' );
// Yo! Dan Heberden
developerBen.introduce.apply( developerDan, [ 'Yo!', 'Hi', 'NO realyy' ] );
// Yo! Dan Heberden



// or, we could split the introduction function off from both
// objects by making it a named function that we assign to the
// introduce property of both developer objects.

function introduce() {
  console.log( this.firstName, this.lastName );
}

var developerBen = {
  firstName: 'Ben',
  lastName: 'Alman',
  introduce: introduce
};

var developerDan = {
  firstName: 'Dan',
  lastName: 'Heberden',
  introduce: introduce
};





// or ... we could realize that what we actually have are two
// *instances* of the same kind of object, and choose to use
// a constructor function and its prototype:

var Person = function( firstName, lastName ) {
  var myName = {
    first: firstName,
    last: lastName
  };

  // assign firstName and lastName properties to the instance
  this._firstName = firstName;
  this._lastName = lastName;
};

// this method is shared by all instances of person
Person.prototype.introduce = function() {
  // it looks at the instance's firstName and lastName properties
  console.log( this.firstName, this.lastName );
};

var developerDan = new Person( 'Dan', 'Heberden' );
var developerBen = new Person( 'Ben', 'Alman' );

developerBen.introduce(); // Ben Alman
developerDan.introduce(); // Dan Heberden


// this works because methods (and properties) that are assigned to
// an object's prototype are shared by all instances of the object.





// when we create methods and properties on a prototype, we can
// change them per object

var Person = function( firstName, lastName ) {
  this.firstName = firstName;
  this.lastName = lastName;
  return this;
};

Person.prototype.introduce = function() {
  console.log( this.firstName, this.lastName );
};


var developerDan = new Person( 'Dan', 'Heberden' );
var developerBen = new Person( 'Ben', 'Alman' );

developerBen.introduce(); // Ben Alman
developerDan.introduce(); // Dan Heberden

Person.prototype.introduce = function() {
  console.log( 'Dan the Man' );
}







// these are all techniques for structuring code, but how do you
// actually organize it in the filesystem?
//
// we want:
//
// - modular files for development & testing
// - built files for production
// - a way to express dependencies
//
// enter requirejs ... it wraps the module pattern in define()

define(function() {
  var Person = function( firstName, lastName ) {
    this.firstName = firstName;
    this.lastName = lastName;
  };

  Person.prototype.introduce = function() {
    console.log( 'My name is ' + this.firstName + ' ' + this.lastName );
  };

  return Person;
});

// if we save this in a file js/person.js, we can use it as a
// dependency for another module definition

define([ 'js/person' ], function( P ) {
  return {
    ben: new P( 'Ben', 'Alman' ),
    dan: new P( 'Dan', 'Heberden' )
  };
});

// if you're here for day 2, we'll dive into requirejs a bit more,
// but for now let's take a look at setting up a simple app with
// it ...
