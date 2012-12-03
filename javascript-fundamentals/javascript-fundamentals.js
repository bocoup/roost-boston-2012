//////////////////////////
// JavaScript Fundamentals
//////////////////////////



////////////
// Variables
////////////

// JavaScript (the language AND the name) is case sensitive.
var foo = 1;
var FOO = 2;
foo // 1
FOO // 2

// Variable values are initialized to `undefined` by default.
var foo;
foo // undefined

// But a value can be assigned at the time the variable is declared.
var bar = 1;
bar // 1

// It's possible to set a global variable without using a `var` statement,
// but it's considered bad practice.
abc = 123;
abc // 123


// Variables are "scoped" (or local) to the function they're declared in,
// or, for variables declared outside any function, to the "global" scope.
var foo = 123;
function test() {
  var foo = 456;
}
foo // 123
test();
foo // 123

// If the `var` statement is omitted, a local variable is NOT created.
var bar = 123;
function test2() {
  bar = 456;
}
bar // 123
test2();
bar // 456



// These are all valid variable names:

var foo, foo123;  // Identifiers can contain numbers, but can't start with one.
var foo_bar;      // Underscores aren't idiomatic JavaScript...
var fooBar;       // ...but camelCased names are.
var FooBar;       // Initial caps are used for constructor functions.
var $foo;         // $ is (supposed to be) reserved for machine-generated names.
var _foo;         // By convention, leading-underscore indicates "private."
var __foo__;      // Double-underscore is usually reserved for internals.



// You can declare multiple variables in a single `var` statement, using a
// comma to separate them.
var a = 1, b = 2, c = 3;

// Although it can be more legible (and safer) to do this:
var a = 1;
var b = 2;
var c = 3;

// Why safer? Imagine you formatted your var declarations like this (this is
// a popular format people use) but forgot a comma after one of the lines:
var a = 1,
    b = 2   // <-- missing comma!
    c = 3;

// JavaScript automatically inserts a semicolon after the second line,
// setting a *global* variable c to 3. Whoops!
var a = 1,
    b = 2;
c = 3;



///////////////////
// Global variables
///////////////////

// In browser JavaScript, the global object can be accessed via "window".
// All global variables are also accessible as properties of that object.
var foo = 123;
function test() {
  bar = 456;
}
test();
foo // 123
bar // 456
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






////////////
// Functions
////////////

// "function" declares code to be run at a future time. The code inside
// will not run until you explicitly tell it to, by putting () parens after
// its name.

// This syntax is also sometimes called a "function declaration" or
// "function statement."
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

// Function expressions are often specified as arguments to other functions.
["zero", "one", "two"].forEach(function(item, index) {
  console.log(item, index);
});



// This code is repetitive, and thus harder to maintain.
function prettyName(first, last) {
  var capitalizedFirst = first.charAt(0).toUpperCase() + first.substring(1).toLowerCase();
  var capitalizedLast = last.charAt(0).toUpperCase() + last.substring(1).toLowerCase();
  return capitalizedFirst + " " + capitalizedLast;
}
prettyName("bENjamIN", "alMan") // "Benjamin Alman"



// Creating a function allows us to reuse code and avoid repetition.
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}
capitalize("bENjamIN") // "Benjamin"

function prettyName(first, last) {
  return capitalize(first) + " " + capitalize(last);
}
prettyName("bENjamIN", "alMan") // "Benjamin Alman"



// Like variables, functions declared inside other functions are local
// to the outer function. Additionally, they can access any other functions
// and variables declared within the outer function.
function prettyName(first, last) {
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
  }
  return capitalize(first) + " " + capitalize(last);
}
prettyName("bENjamIN", "alMan") // "Benjamin Alman"
capitalize // ReferenceError: capitalize is not defined



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






/////////////////////////////////////////////
// Variable and function declaration hoisting
/////////////////////////////////////////////

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



// Where does function declaration hoisting matter?
function whoops(state) {
  if (state) {
    function getValue() {
      return "you expect this";
    }
  } else {
    function getValue() {
      return "you get this, no matter what";
    }
  }
  return getValue();
}
whoops(false) // "you get this, no matter what"
whoops(true) // "you get this, no matter what"

// This is what's really happening:
function whoops(state) {
  // Both function declarations get hoisted...
  function getValue() {
    return "you expect this";
  }
  // And the latter overrides the former.
  function getValue() {
    return "you get this, no matter what";
  }
  // This if-else does nothing.
  if (state) {
  } else {
  }
  // The wrong value is returned.
  return getValue();
}

// How do we fix this? Don't use function declaration inside blocks! Use
// function expressions instead!
function fixed(state) {
  var getValue;
  if (state) {
    getValue = function() {
      return "state was truthy";
    };
  } else {
    getValue = function() {
      return "state was falsy";
    };
  }
  return getValue();
}
fixed(false) // "state was falsy"
fixed(true) // "state was truthy"






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

// Beware of rounding issues when doing math.
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

// You can test for NaN with the global isNaN() function.
isNaN(result) // true



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


// If it helps, think of undefined as the "default" non-value, while
// null is the "explicitly set" non-value.






//////////////////////////
// Coercion and Comparison
//////////////////////////

// You can coerce values by passing a value into a type's function.

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

// You can coerce to numbers:
Number("12")        // 12
Number("012")       // 12
Number("1.2")       // 1.2
Number("1e3")       // 1000
Number("1xy")       // NaN
Number("")          // 0
Number(false)       // 0
Number(true)        // 1
Number([])          // 0

// You can coerce to strings:
String(123)         // "123"
String(true)        // "true"
String(false)       // "false"
String([1, 2, 3])   // "1,2,3"
String([])          // ""
String({a: 1})      // "[object Object]"
String(String)      // "function String() { [native code] }"



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
1 + 2         // 3
1 + "2"       // "12"
- "1"         // -1
+ "1"         // 1
+ "a"         // NaN
+new Date()   // 1292604183838
1 + true      // 2

function foo() { alert("hi!"); }
foo + ""      // "function foo() { alert("hi!"); }"

1 == true     // true (because true gets coerced to 1)

// FWIW, these do the same things:
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
false == 0         // true
0 == ""            // true
"" == false        // true

// == returns true when comparing null and undefined
null == undefined  // true

// Note that null and undefined are, indeed, two different values.
null === undefined // false

// And, of course, NaN isn't === or == anything (LOLWUT).
NaN == NaN         // false



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






//////////
// Objects
//////////

// Everything that's not a primitive is an object.

// You can create a new object using the "new" keyword and the Object
// constructor function.
var obj = new Object();

// But using the object literal syntax is less to type.
var obj = {};

// Objects are passed and compared by reference, while primitives are compared
// by their value.
var obj1 = {foo: 123};
var obj2 = {foo: 123};

obj1 === obj2         // false (obj1 and obj2 are two different objects)
obj1.foo === obj2.foo // true (both properties have the same primitive value)



// You can initialize properties at the time an object is created. Note that
// properties defined in an object literal need to be quoted if they contain
// special characters.
var obj = {foo: 123, 'bar': 456, "I can't wait!!": 789};



// Object propery names are always strings. You can access, or dereference,
// them via the "square bracket" syntax:
obj["I can't wait!!"]  // 789

var key = "foo";
obj[key]               // 123

// Or via the "dot" syntax, if the name doesn't contain special characters:
obj.bar                // 456



// What does "object property names are always strings" mean?
var obj = {};
obj["test"] = 100;

// obj now looks like this:
{
  "test": 100
}


// Let's make a function.
function test() { return 123; }
test() // 123

// And let's invoke the function.
obj[test()] = 200;

// obj now looks like this:
{
  "123": 200,
  "test": 100
}


// What happens if we don't invoke the function? (Hint: WHOOPS)
obj[test] = 300;

// obj now looks like this:
{
  "123": 200,
  "test": 100,
  "function test() { return 123; }": 300
}


// Remember, object property names are *always* strings.
obj[obj] = 400;

// obj now looks like this:
{
  "123": 200,
  "test": 100,
  "function test() { return 123; }": 300,
  "[object Object]": 400
}


// What happens if we define a .toString method on obj?
obj.toString = test;
obj[obj] = 999;

// obj now looks like this:
{
  "123": 999,
  "test": 100,
  "function test() { return 123; }": 300,
  "[object Object]": 400
}



////////////////////////////////
// Variables are not properties!
////////////////////////////////

// A variable.
var value = "variable";

// An object with a property.
var obj = {};
obj.value = "property";

value     // "variable"
obj.value // "property"

// A function that logs both the variable and the property.
obj.logValues = function() {
  console.log(value);
  console.log(obj.value);
};

obj.logValues();
// "variable"
// "property"






////////////////////
// Object Prototypes
////////////////////

// While you can define properties directly on objects...
var obj = {};
obj.foo = 123;
obj.hasOwnProperty("foo") // true

// Objects inherit properties from their prototype.
obj.hasOwnProperty("toString") // false
obj.toString() // "[object Object]"

Object.prototype.hasOwnProperty("toString") // true

// You can define properties on the object prototype, BUT DON'T DO THIS!
Object.prototype.bar = 456;
obj.bar // 456

// Why not? Because once the Object prototype is modified, EVERY for-in loop
// over ANY instance of ANY OBJECT will be "tainted".
var prop;
for (prop in obj) {
  console.log(prop, obj[prop]);
}
// logs: "foo" 123
// logs: "bar" 456



// You can test to see if a property is in an object.
"foo" in obj   // true
"bar" in obj   // true

// And you can delete properties from objects.
delete obj.foo;
delete Object.prototype.bar;

"foo" in obj   // false
"bar" in obj   // false






/////////////////////
// Self-aware Objects
/////////////////////

var awesome = "Horrible"; // <-- Dramatic foreshadowing

var obj = {};
obj.awesome = "Awesome";

// You can hard-code objects by name.
obj.getAwesome = function(word) {
  console.log(obj.awesome + " " + word);
};

obj.getAwesome("sauce"); // logs: "Awesome sauce"


// Or you can use the more portable "this" value instead.
obj.getAwesome2 = function(word) {
  console.log(this.awesome + " " + word);
};

obj.getAwesome2("possum"); // logs: "Awesome possum"


// What's the downside?

// This example works, because "this" wasn't used in .getAwesome.
["sauce", "possum"].forEach(obj.getAwesome);
// "Awesome sauce"
// "Awesome possum"

// But depending on how functions get invoked, the "this" value could
// be the object, or it could be the GLOBAL OBJECT (whoops)
["sauce", "possum"].forEach(obj.getAwesome2);
// "Horrible sauce"
// "Horrible possum"



// When functions are invoked as they are being dereferenced from an
// object, the "this" value inside the function refers to that object.

   obj.getAwesome2("sauce");
// ^^^ the "this" value inside of the .getAwesome2 function.

// But if the dereferencing...
var myFunction = obj.getAwesome2;

// ...and the invoking happen in two different steps...
myFunction("fail"); // logs: "Horrible fail"



// Every function has a .call method, that's invoked just like the
// function, except it takes one additional argument up-front. The
// "this" value.
myFunction.call(obj, "sauce"); // logs: "Awesome sauce"

// And an .apply method, that works the same way but takes an array
// of arguments.
myFunction.apply(obj, ["sauce"]); // logs: "Awesome sauce"


// (Or an arguments object, but .bind is extra credit)
function bind(fn, thisValue) {
  return function() {
    return fn.apply(thisValue, arguments);
  };
}






//////////////////////
// The typeof Operator
//////////////////////

typeof 1                    // "number"
typeof "amazing"            // "string"
typeof true                 // "boolean"

typeof {}                   // "object"
typeof []                   // "object" (unfortunately)
typeof new Number(1)        // "object" (new + Contructor returns an object)
typeof new String("yo!")    // "object" (new + Contructor returns an object)
typeof new Boolean(true)    // "object" (new + Contructor returns an object)
typeof new Date("1/1/1999") // "object" (new + Contructor returns an object)

typeof Date("1/1/1999")     // "string" (didn't use the new keyword)

typeof function() {}        // "function"
typeof /^foo$/i             // "function" (in some browsers)

typeof undefined            // "undefined"
typeof null                 // "object" ?!

typeof NaN                  // "number" ?!







//////////////////////////
// The instanceof Operator
//////////////////////////

// The instanceof operator tests the presence of constructor.prototype in
// object's prototype chain.
object instanceof constructor

// Constructor functions used for primitive types return primitives unless
// the new keyword is used.

1                         instanceof Number   // false (primitive)
"amazing"                 instanceof String   // false (primitive)
true                      instanceof Boolean  // false (primitive)
new Number(1)             instanceof Number   // true (object)
new String("amazing")     instanceof String   // true (object)
new Boolean(true)         instanceof Boolean  // true (object)

// Constructor functions for other built-in types return objects, regardless of
// whether the new keyword is used.

var obj = {};           // sample object
var fn = function() {}; // sample function

obj                       instanceof Object   // true
[]                        instanceof Array    // true
fn                        instanceof Function // true
/^bar$/i                  instanceof RegExp   // true
Object()                  instanceof Object   // true
Array(1, 2, 3)            instanceof Array    // true
Function("return 1")      instanceof Function // true
RegExp("^bar$", "i")      instanceof RegExp   // true
new Object()              instanceof Object   // true
new Array(1, 2, 3)        instanceof Array    // true
new Function("return 1")  instanceof Function // true
new RegExp("^bar$", "i")  instanceof RegExp   // true

// If Date is called without the new keyword, it returns a string, not a Date
// object.

Date("1/1/1999")          instanceof Date     // false
new Date("1/1/1999")      instanceof Date     // true

// And, for what it's worth, everything that was a instanceof a type is also
// instanceof Object, because all types inherit from Object (the base type).

obj                       instanceof Object   // true
[]                        instanceof Object   // true
fn                        instanceof Object   // true
/^bar$/i                  instanceof Object   // true
Array(1, 2, 3)            instanceof Object   // true
Function("return 1")      instanceof Object   // true
RegExp("^bar$", "i")      instanceof Object   // true
Object()                  instanceof Object   // true
new Number(1)             instanceof Object   // true
new String("amazing")     instanceof Object   // true
new Boolean(true)         instanceof Object   // true
new Date("1/1/1999")      instanceof Object   // true
new Array(1, 2, 3)        instanceof Object   // true
new Function("return 1")  instanceof Object   // true
new RegExp("^bar$", "i")  instanceof Object   // true






////////////////////////
// Smarter Type Checking
////////////////////////

// The built-in Object type has a .toString method on its prototype, so all
// objects get that method automatically.
var obj = {};
obj.toString() // "[object Object]"

// While all other built-in types have their own .toString method that returns
// a meaningful value:
var arr = [1, 2, 3];
arr.toString() // "1,2,3"

// The Object .toString method can be run using call invocation, thus changing
// this `this` value inside the function.
var toString = Object.prototype.toString;

toString.call(false)              // "[object Boolean]"
toString.call(new Boolean(true))  // "[object Boolean]"

toString.call(0)                  // "[object Number]"
toString.call(new Number(1))      // "[object Number]"

toString.call("a")                // "[object String]"
toString.call(new String("z"))    // "[object String]"





