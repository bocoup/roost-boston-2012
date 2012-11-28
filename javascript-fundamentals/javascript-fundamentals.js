//////////////////////////
// JavaScript Fundamentals
//////////////////////////



////////////
// Variables
////////////

// JavaScript (the language AND the name) is case sensitive.

var FOO = 1;
foo // undefined



// The scope of a variable is the current function or, for variables declared
// outside any function, the global scope. These are all valid names:

var foo, foo123;  // Identifiers can contain numbers, but can't start with one.
var foo_bar;      // Underscores aren't idiomatic JavaScript...
var fooBar;       // ...but camelCased names are.
var FooBar;       // PascalCase is used for constructor functions.
var $foo;         // $ is (supposed to be) reserved for machine-generated names.
var _foo;         // By convention, leading-underscore indicates "private."
var __foo__;      // Double-underscore is usually reserved for internals.



// Variable values are initialized to `undefined` by default.
var foo;
foo // undefined

// But a value can be assigned at the time the variable is declared.
var bar = 1;
bar // 1

// You can declare multiple variables in a single `var` statement, using a
// comma to separate them.
var a = 1, b = 2, c = 3;

// Although it's usually more legible (and safer) to do this:
var a = 1;
var b = 2;
var c = 3;

// Why safer? Imagine you formatted your var declarations like this (this is
// a popular format people use) but forgot a comma after one of the lines:
var a = 1,
    b = 2   // <-- missing comma!
    c = 3;

// JavasScript automatically inserts a semicolon after the second line,
// setting the *global* variable c to 3. Whoops!
var a = 1,
    b = 2;
c = 3;



/////////////////
// Variable Scope
/////////////////

// While it's possible to set a global variable without using a `var`
// statement, it's considered bad practice.
abc = 123;
abc // 123

// Variables declared without using a `var` statement are implicitly global.
// Those declared with `var` are local to the function in which they are
// created (or the global scope, if created outside of any function).
function test1() {
  foo = 456;
}
test1();
foo // 456

function test2() {
  var bar = 456;
}
test2();
bar // ReferenceError: bar is not defined

// In browser JavaScript, the global object can be accessed via "window".
// All global variables are also accessible as properties of that object.
var foo = 123;
function test3() {
  bar = 456;
}
test3();
window.foo // 123
window.bar // 456



/////////////////////////
// Does a variable exist?
/////////////////////////

// If `foo` is accessed before being declared or initialized, an exception
// will be thrown.
if (foo) { /* code */ } // ReferenceError: foo is not defined

// You can use the `typeof` operator to see if a variable is undefined or not.
if (typeof foo !== "undefined") { /* code */ }

// You can access global variables as a property of the global object. This
// technique only works for global variables.
if (window.foo !== undefined) { /* code */ }

// In this case, the `in` operator is used to see if a global variable has
// actually been declared, instead of looking at its value.
if ("foo" in window) { /* code */ }



////////////////////////////////
// Variables are not properties!
////////////////////////////////

// A variable.
var value = "variable";

// An object with properties.
var obj = {
  value: "property",
  getValue: function() {
    return value + ", " + this.value;
  }
};

value          // "variable"
obj.value      // "property"

obj.getValue() // "variable, property"






////////////
// Functions
////////////

// "function" declares a function with the specified parameters. This is
// also sometimes called a "function declaration" or "function statement."
function addTwoNumbers(a, b) {
  return a + b;
}
addTwoNumbers(1, 2) // 3

// "return" specifies the value to be returned by a function. If no value is
// explicitly returned, the function returns `undefined`.
function doNothing() {
  /* nothing */
}
doNothing() // undefined

// Functions can also be defined using the "function expression" syntax.
var addTwoNumbers = function(a, b) {
  return a + b;
};
addTwoNumbers(1, 2) // 3



// This code is repetitive, and thus harder to maintain.
function prettyName(first, last) {
  var capitalizedFirst = first.charAt(0).toUpperCase() + first.substring(1).toLowerCase();
  var capitalizedLast = last.charAt(0).toUpperCase() + last.substring(1).toLowerCase();
  return capitalizedFirst + " " + capitalizedLast;
}
prettyName("bENjamIN", "alMan") // "Benjamin Alman"



// Creating a function allows us to reuse code, and avoid repetition.
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}
capitalize("bENjamIN") // "Benjamin"

function prettyName(first, last) {
  return capitalize(first) + " " + capitalize(last);
}
prettyName("bENjamIN", "alMan") // "Benjamin Alman"



// While JavaScript doesn't have block scope, it does have function scope. Like
// variables declared with the `var` keyword, functions declared inside other
// functions are local to the outer function, and can access any other functions
// and variables declared within the outer function.
function prettyName(first, last) {
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
  }
  return capitalize(first) + " " + capitalize(last);
}
prettyName("bENjamIN", "alMan") // "Benjamin Alman"
capitalize // ReferenceError: capitalize is not defined



///////////////////////
// Scoping and Hoisting
///////////////////////

// Variable hoisting.
var foo = 1;
function bar() {
  if (!foo) {
    var foo = 10;
  }
  return foo;
}

bar() // What does this return?

// What's really happening:
var foo = 1;
function bar() {
  var foo; // Variable declarations (not assignments) are hoisted!
  if (!foo) {
    foo = 10;
  }
  return foo;
}

bar() // 10



// Function declaration hoisting.
var foo = 1;
function bar() {
  foo = 10;
  return;
  function foo() {}
}

bar();
foo // What is this value?

// What's really happening:
var foo = 1;
function bar() {
  function foo() {} // Function declarations are hoisted!
  foo = 10;
  return;
}

bar();
foo // 1



// For example, we could run superExpensiveComputation() every time we
// want to logSomething(), but that's not very efficient.
function doSomething(a, b) {
  function logSomething() {
    if (superExpensiveComputation()) {
      console.log(a * 2);
    } else {
      console.log(b / 3);
    }
  }
  for (var i = a; i < b; i++) {
    logSomething();
  }
}

// One alternative strategy would be to create a different "logSomething"
// function based on the result of superExpensiveComputation().
function doSomething(a, b) {
  if (superExpensiveComputation()) {
    function logSomething() {
      console.log(a * 2);
    }
  } else {
    function logSomething() {
      console.log(b / 3);
    }
  }
  for (var i = a; i < b; i++) {
    logSomething();
  }
}

// The problem is that, due to function declaration hoisting, this is
// what actually happens:
function doSomething(a, b) {
  function logSomething() {          // This function gets hoisted to
    console.log(a * 2);              // the top of the parent function.
  }
  function logSomething() {          // Then this function gets hoisted,
    console.log(b / 3);              // overriding the previous one.
  }
  if (superExpensiveComputation()) { // And this if-else statement?
  } else {                           // It does absolutely nothing.
  }
  for (var i = a; i < b; i++) {
    logSomething();
  }
}

// So what's the solution? Use function expressions instead, no hoisting!
function doSomething(a, b) {
  var logSomething;
  if (superExpensiveComputation()) {
    logSomething = function() {
      console.log(a * 2);
    };
  } else {
    logSomething = function() {
      console.log(b / 3);
    };
  }
  for (var i = a; i < b; i++) {
    logSomething();
  }
}

// Or we could just use a variable.
function doSomething(a, b) {
  var result = superExpensiveComputation();
  function logSomething() {
    if (result) {
      console.log(a * 2);
    } else {
      console.log(b / 3);
    }
  }
  for (var i = a; i < b; i++) {
    logSomething();
  }
}



/////////////////////
// Function arguments
/////////////////////

// JavaScript initializes any argument whose value has been omitted to
// `undefined` and ignores any extra arguments for which a named argument
// has not been specified.
function test(a, b, c) {
  return [a, b, c];
}

test()              // [undefined, undefined, undefined]
test(1, 2)          // [1, 2, undefined]
test(1, 2, 3, 4, 5) // [1, 2, 3]

// The `arguments` object is an array-like object inside of every function that
// has some useful properties. It's not accessible outside of a function.

// Iterate over all arguments using the .length property and [idx].
function logEachArgument(a, b, c) {
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}
logEachArgument(1, 2, 3, 4, 5);
// logs: 1 2 3 4 5


// JavaScript doesn't support method overloading, but you can implement the
// same logic by using conditionals and the arguments object.
var _value;
function getOrSet(value) {
  if (arguments.length === 0) {
    return _value;
  } else {
    _value = value;
  }
}






//////////////////
// Primitive Types
//////////////////

// There are five primitive types: undefined, null, boolean, string, number.
// Everything else is an object. Note that when using `new` with a constructor
// function, an object (not a primitive) will always be returned.

typeof true                       // "boolean"
typeof new Boolean(true)          // "object"

typeof 9000                       // "number"
typeof new Number(9000)           // "object"

typeof "hello world"              // "string"
typeof new String("hello world")  // "object"



///////////
// Booleans
///////////

true  // true
false // false

true !== false  // true
true === !false // true

if (true) { /* this code will execute */ }
if (!false) { /* this code will execute */ }



//////////
// Strings
//////////

// These are all valid strings.
'foo'
"bar"
'\u0041'
"this is on the first line\nand this the second"

// This is not.
"hello
world" // SyntaxError: Unexpected token ILLEGAL

// The backslash character is used in strings as an escape character.
"foo\nbar"  // foo<linebreak>bar
"foo\tbar"  // foo<tab>bar
"foo\"bar"  // foo"bar
"foo\\bar"  // foo\bar

// Strings have lengths.
"testing".length // 7

// And methods.
"Hello World".indexOf("W")  // 6
"Hello World".toLowerCase() // "hello world"
"Hello World".split(" ")    // ["Hello", "World"]
"Hello World".charAt(0)     // "H"
"Hello World".substring(6)  // "World"

// Strings aren't mutable.
var test = "Hello World";
test.toLowerCase() // "hello world"
test // "Hello World"

// But you can override values in variables by re-setting them.
test = test + "? " + "Hello World".toUpperCase() + "!";
test // "Hello World? HELLO WORLD!"



//////////
// Numbers
//////////

// In Javascript, there's only one type of number, and it's a 64-bit float.

// These are all the same number.
1234
1234.0
1.234e3

// Beware of rounding issues.
0.1 + 0.2       // 0.30000000000000004
0.01 + 0.02     // 0.03
0.0001 + 0.0002 // 0.00030000000000000003

// Scaling fractional numbers can prevent these rounding issues, but it's
// not always practical.
((10000 * 0.0001) + (10000 * 0.0002)) / 10000 // 0.0003



// Beware of NaN and computational errors.
Math.sqrt(-1) // NaN

var result = "five" - "four";
result // NaN

// You can test for NaN with the global isNaN() function...
isNaN(result) // true

// ...because it's not actually equal to itself!
result === NaN // false



// `Infinity` is a number.
1 / 0 // Infinity

// If you want to test that a number is finite, use the global
// isFinite function!
isFinite(Infinity) // false



// You can parse strings into integers:
parseInt("12")      // 12
parseInt("012")     // 10 (string with leading 0 interpreted as octal)
parseInt("012", 10) // 12 (force parseInt to use base-10)
parseInt("345", 2)  // NaN (no part of the string can be parsed as base-2)
parseInt("1.2", 10) // 1
parseInt("1e3", 10) // 1
parseInt("1xy", 10) // 1

// Or non-integers:
parseFloat("3.14")        // 3.14
parseFloat("314e-2")      // 3.14
parseFloat("0.0314E+2")   // 3.14
parseFloat("3.14foobar")  // 3.14



// There are also many static Math methods:
Math.abs(-5)          // 5
Math.min(1, 2, 3)     // 1
Math.max(1, 2, 3)     // 3
Math.sin(Math.PI / 2) // 1
Math.cos(Math.PI)     // -1
Math.pow(5, 2)        // 25
Math.random()         // 0 <= num < 1
Math.round(Math.PI)   // 3
Math.floor(Math.PI)   // 3
Math.ceil(Math.PI)    // 4



///////////////////
// Null & Undefined
///////////////////

// Variable values are initialized to `undefined` by default.
var foo;
foo // undefined

// So are object properties.
var obj = {};
obj.foo // undefined

// Functions return `undefined` by default.
function doNothing() {}
doNothing() // undefined

// So does the `void` operator.
void 0 // undefined



// So, variables can be undefined.
var foo;

// Variables can contain values or references to objects.
foo = 123;
foo // 123

// And variables can be explicitly set to `null`.
foo = null;
foo // null






//////////////////////////
// Coercion and Comparison
//////////////////////////

// You can coerce values by passing a value into a type's function.

// You can coerce to strings:
String(123)       // "123"
String(true)      // "true"
String(false)     // "false"
String([1, 2, 3]) // "1,2,3"
String([])        // ""
String({a: 1})    // "[object Object]"
String(String)    // "function String() { [native code] }"

// You can coerce to numbers:
Number("12")  // 12
Number("012") // 12
Number("1.2") // 1.2
Number("1e3") // 1000
Number("1xy") // NaN
Number("")    // 0
Number(false) // 0
Number(true)  // 1
Number([])    // 0

// You can coerce to booleans:
Boolean(0)          // false
Boolean("")         // false
Boolean(null)       // false
Boolean(undefined)  // false
Boolean(NaN)        // false
Boolean(false)      // false
Boolean(true)       // true
Boolean("foo")      // true
Boolean(1)          // true
Boolean({a: 1})     // true
Boolean([1, 2, 3])  // true
Boolean(Boolean)    // true

// FWIW, those first five values (the ones that aren't false, but for which
// the Boolean function returns false) are JavaScript's "falsy" values.



// When an object is coerced to a string, its .toString() method is called.
// "Plain" objects return a relatively useless string. Arrays are just
// joined on ",". Most other things get stringified in some way.
function add(a, b) { return a + b; }
var obj = {a: 1, b: 2};
var arr = [1, 2, 3];

add.toString()  // "function add(a, b) { return a + b; }"
obj.toString()  // "[object Object]"
arr.toString()  // "1,2,3"
String(add)     // "function add(a, b) { return a + b; }"
String(obj)     // "[object Object]"
String(arr)     // "1,2,3"

// You can change how an object is stringified by defining a .toString method.
obj.toString = function() { return this.a + this.b; };
String(obj)     // "3"



// Many of JavaScript's operators perform type coercion. For example, because
// the + operator does both addition and concatenation, it will coerce its
// operands to either numbers or strings, depending on the operand types.
"1" + 2       // "12"
- "1"         // -1
+ "1"         // 1
+ "a"         // NaN
+new Date()   // 1292604183838
1 + true      // 2

function foo() { alert("hi!"); }
foo + ""      // "function foo() { alert("hi!"); }"

1 == true     // true (because true gets coerced to 1)

// These do the same things:
String(val) === "" + val
Number(val) === +val
Boolean(val) === !!val



///////////////////////////
// The == and === Operators
///////////////////////////

// "The Strict Equality Comparison Algorithm"
// How does the === operator work? Given x === y:

// Type(x)          Values                                Result
// Type(x) different from Type(y)...                      false
// Undefined or Null                                      true
// Number           x same value as y (but not NaN)       true
// String           x and y are identical characters      true
// Boolean          x and y are both true or both false   true
// Object           x and y reference same object         true
// Otherwise...                                           false



// "The Abstract Equality Comparison Algorithm"
// How does the == operator work? Given x == y:

// Type(x)              Type(y)               Result
// If x and y are the same type...            Follow === operator rules.
// Null                 Undefined             true
// Undefined            Null                  true
// Number               String                x == toNumber(y)
// String               Number                toNumber(y) == x
// Boolean              (any)                 toNumber(x) == y
// (any)                Boolean               x == toNumber(y)
// String or Number     Object                x == toPrimitive(y)
// Object               String or Number      toPrimitive(x) == y
// Otherwise...                               false



///////////////////
// Truthy and Falsy
///////////////////

// In addition to the proper Boolean value false, JavaScript has five "falsy"
// values: 0, "", null, undefined, NaN. These values are equivalent to false in
// most scenarios, but they are NOT false.
var a = 0;
var b = "";
var c = null;
var d = undefined;
var e = NaN;
// Actually false.
var f = false;

// Passing a falsy value into an if statement works the same as passing false,
// because falsy values get coerced to false.
if (a) { /* This code will NOT execute */ }
if (b) { /* This code will NOT execute */ }

// Negate a falsy value by using the ! (logical NOT) operator.
if (!c) { /* This code will execute */ }
if (!d) { /* This code will execute */ }

// Test to see if a value is actually false by using the === operator.
if (e === false) { /* This code will NOT execute */ }
if (f === false) { /* This code will execute */ }



// Note that while all five falsy values can stand in for false in an if
// statement, not all of them are == each other.

// == returns true when comparing false, 0, ""
false == 0        // true
0 == ""           // true
"" == false       // true

// == returns true when comparing null and undefined
null == undefined // true

// Note that null and undefined are, indeed, two different values.
null === undefined // false

// NaN isn't == anything.
NaN == NaN        // false



// Every value that's not falsy (or false) is truthy.
var g = -3;
var h = "hello world";
var i = [];
var j = [1, 2, 3];
var k = {a: 1, b: 2};
var l = function() {};
var m = /^hello/i;
// And of course, true is true.
var n = true;

if (g) { /* This code will execute */ }
if (h) { /* This code will execute */ }
// etc.



// Because of the way == works, booleans can be coerced to primitives.
1 == true   // true
0 == false  // true

// Even though a number or string might be truthy, when compared to true using
// the == operator, it won't evaluate to true.
var value = 5;
if (value) { /* While this code will execute... */ }
if (value == true) { /* This code will not, because 5 != 1 */ }



// Summary: When you're looking for a truthy or falsy value, pass the value
// into your if statement, negating with ! if necessary. When you're looking
// specifically for true or false, use === or !==. Finally, use == or != only
// when you want to test for null or undefined with == null or != null.
























