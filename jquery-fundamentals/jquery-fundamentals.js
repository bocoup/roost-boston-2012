//////////////////////
// jQuery Fundamentals
//////////////////////



//////////////////////
// The jQuery function
//////////////////////

// Select some elements on the page using either this:
var elems = jQuery(selector);

// Or this:
var elems = $(selector);

// (jQuery and $ are references to the same global function)
jQuery === $ // true

// So instead of this mouthful:
var elem = document.getElementById("header1");
if (elem) {
  elem.innerHTML = "Lame.";
}

// You can just do this:
$("#header1").html("Awesome!");






//////////////////////
// What is $, anyways?
//////////////////////

// Just to prove a point.
var $ = function(selector) {
  return selector + " is a selector string, whatev";
};

$("#header1"); // "#header1 is a selector string, whatev"



// Unlike many other languages, the "$" character has no special meaning in
// JavaScript. It's just another valid character used in named identifiers,
// like letters, numbers and underscores.
var $foo = 123;
var bar$ = 456;
var $o$m$g$ = 789;
var $$_$$_sUp3r_$_dUp3r_$$_$$ = "wtf, dude";






////////////////////////////////
// jQuery objects are array-Like
////////////////////////////////

// Select some elements, and store a reference to the resulting jQuery
// object in a variable.
var elems = $(".nonexistent");

// While you CAN test if elements were selected like this:
if (elems.length > 0) {
  elems.html("Nothing happens.");
}

// In most cases, you'll just want to do this. jQuery implicitly iterates
// when you call jQuery methods on jQuery objects, so you don't need to
// loop explicitly.
$(".nonexistent").html("Nothing happens, but with much less code!");

// If 0 elements were selected, jQuery does nothing. If 1 element was
// selected, jQuery updates the html of that one element. If 9001 elements
// were selected, jQuery updates the html of all 9001 elements.
$("derp").html("Awesome!");
$("#header1").html("Awesome!");
$("li").html("Awesome!");






///////////////////////////////
// jQuery objects are snapshots
///////////////////////////////

// When you select elements from the document, you select them as they
// exist in the document at the moment the jQuery function is called.
var allDivsInTheDocument = $("div");

// So if there were 10 elements...
allDivsInTheDocument.length // 10

// And you add a few more...
$("<div/><div/><div/>").appendTo("body");

// The existing jQuery objects you have don't change!
allDivsInTheDocument.length // 10

// Selecting elements from the document by calling the jQuery function
// again will create a new snapshot.
var allDivsInTheDocumentNow = $("div");
allDivsInTheDocumentNow.length // 13






/////////////////////
// Selecting elements
/////////////////////

// You can use standard CSS selectors.
var allDivsInTheDocument = $("div");
var anchorChildrenOfParagraphs = $("p > a");
var emailInputsInsideMyform = $("#my-form input[name='email']");

// Along with standard CSS selectors, you can use custom jQuery selectors:
var currentlyAnimatingDivs = $("div:animated");

// Although custom jQuery selectors are much more useful when used in
// scenarios like this.
$("p").on("click", function() {
  var elem = $(this);
  if (!elem.is(":animated")) {
    elem.slideUp(3000).slideDown(500);
  }
});

// How can we write the previous example in a more concise way, using
// implicit iteration?
$("p").on("click", function() {
  $(this).not(":animated").slideUp(3000).slideDown(500);
});

// Avoid custom jQuery selectors when you don't need them, because they
// prevent jQuery from taking advantage of native DOM methods.
$("form input:submit").submit();

// Using a querySelectorAll-supported selector will be significantly
// faster in modern browsers.
$("form input[type='submit']").submit();






//////////////////////
// Know your selectors
//////////////////////

// Keep your selectors simple!
var overlySpecific = $("body p#paragraph1");
var specificEnough = $("#paragraph1"); // Single #id selectors are fast!

// Know the difference between selectors?

// What's the difference?
$("li:odd").addClass("highlight");
$("li:nth-child(odd)").addClass("selected");

// What's the difference?
$("li:first").addClass("highlight");
$("li:first-child").addClass("selected");

// What's the difference?
$("p > a").addClass("highlight");
$("p a").addClass("selected");
$("p:has(a)").addClass("highlight");






///////////////////////
// Other ways to select
///////////////////////

// Not only can you select elements with a selector string:
var inputs = $("form input[name='first']");

// You can pass a object into jQuery:
var win = $(window);

// Or even an array of objects:
var winAndDoc = $([window, document]);

// Since jQuery 1.4, you can easily get an empty set, if you need it.
var emptySet = $();


// Where else do we commonly pass an object into jQuery?
$("a").on("click", function() {
  $(this).addClass("highlight"); // <---- right there with $(this)!
});

// Or:
$("a").each(function() {
  $(this).addClass("selected"); // <---- right there with $(this)!
});






/////////////////
// Filtering sets
/////////////////

// Given this jQuery object...
var divs = $("div");

// The "not" method filters the selected set of elements down to the
// subset that doesn't match the given selector. This could be anywhere
// from 0 to all of the initial set of elements.
var divsNotAnimating = divs.not(":animated");

// Using the ":not" selector inside the "filter" method will yield
// equivalent results.
var divsNotAnimating = divs.filter(":not(:animated)");

// Of course, given the option, you could choose to do everything with a
// single selector string.
var divsNotAnimating = $("div:not(:animated)");

// There are many jQuery custom selectors that can be used for filtering.
var firstDiv = $("div:first");
var lastDiv = $("div:last");
var secondDiv = $("div:eq(1)");
var divsContainingAnchors = $("div:has(a)");

// And for most of them, there exists a corresponding filtering method.
var firstDiv = divs.first();
var lastDiv = divs.last();
var secondDiv = divs.eq(1);
var divsContainingAnchors = divs.has("a");






/////////////////////
// Traversing the DOM
/////////////////////

var form = $("#my-form");

// You can find all descendant elements of an element.
var inputsInForm = form.find("input");

// Or all children of an element.
var childrenOfForm = form.children();

// There are all kinds of traversal methods. Parents, children, siblings,
// you name it.
$("h1").siblings().children(":first-child").next().addClass("highlight");
$("li").parent().prevAll().addClass("highlight");

// Elements don't have to be in the document to be traversable.
$("<p><i/><b/></p>");                               // [<p><i></i><b></b></p>]
$("<p><i/><b/></p>").children();                    // [<i>​</i>​, <b>​</b>​]
$("<p><i/><b/></p>").children().text("x");          // [<i>​x</i>​, <b>x​</b>​]
$("<p><i/><b/></p>").children().text("x").parent(); // [<p><i>x</i><b>x</b></p>]






//////////////////////
// Getters and setters
//////////////////////

// jQuery methods are both setters, modifying every selected element...
$("li").html("<b>Hello</b> <i>world</i>");
$("li").text("<b>Hello</b> <i>world</i>");

// And getters. Note that methods that work as both getter and setter
// will only return the value for the FIRST selected element.
$("li").html(); // "<i>item 1</i> content"

// With a few notable exception, of course.
$("li").text(); // "item 1 contentitem 2 content item 3 contentitem 4 content"

// Most methods that work as setters and getters will also accept a
// callback that can be used to programmatically change values. Think
// of this as a "combo" getter + setter.
$("li").html(function(index, value) {
  return "<b>" + index + "</b> " + value;
});






////////////////////////////
// Attributes and properties
////////////////////////////

var img = $("img").first();

// Set the src attribute of the image.
img.attr("src", "/static/img/sample.gif");

// Get the src attribute.
console.log( img.attr("src") ); // "/static/img/sample.gif"

// Get the src property with jQuery.
console.log( img.prop("src") ); // "http://bocoup.com/static/img/sample.gif"

// But if you already have a DOM element reference, you can access
// properties directly from the element. This is very efficient!
console.log( this.src );        // "http://bocoup.com/static/img/sample.gif"

// Also, this is how you set and unset a boolean attribute. To disable an
// element, you set the "disabled" attribute to "disabled". To re-enable
// the element, you remove the attribute.
img.attr("disabled", "disabled");
img.removeAttr("disabled");

// To disable or re-enable an element using a boolean property, you just
// set the property value to true or false. Much nicer!
img.prop("disabled", true);
img.prop("disabled", false);



// Change form element values.
$("form input[name='first']").val("Ben");

// Add or remove classes.
$("div").addClass("foo").removeClass("bar").toggleClass("foo bar");

// Change inline style properties.
$("p").css({
  color: "#fff",
  opacity: 0.75,
  fontWeight: 700,
  "background-color": "#007"
});

// Get and set inline style properties.
$("p").css("color", "#0a0");
$("p").css("color"); // "rgb(0, 170, 0)" (Note: value format may change!)

// Change width and height. Also see .innerHeight() and .outerHeight().
$("img").width(30).height(150);

// Change offsets.
$("img:first").offset({left: 300, top: 200});






///////////////////////////////////////////////////////
// Modifying jQuery objects doesn't update the document
///////////////////////////////////////////////////////

// If you select some elements from the document...
var myElement = $("#my-element");

// And then modify that jQuery object...
myElement.id = "another-value";

// It doesn't actually change the DOM or any selected elements!
myElement.prop("id") // "my-element"

// It just changes the property of that jQuery object.
myElement.id // "another-value"

// If you want to modify elements, use jQuery methods!
myElement.prop("id", "another-value");






////////////////////////
// Creating new elements
////////////////////////

// When creating elements, you can add attributes, properties, content, etc.
var graph = $('<p id="test" class="fancy"><b>hello</b> <i>world</i></p>');

// You can do the same things (and more) with jQuery methods.
var graph = $("<p/>");
graph.prop("id", "test");
graph.addClass("fancy");
graph.html("<b>hello</b> <i>world</i>");
graph.on("click", function() {
  console.log( $(this).text() );
});

// Ever since jQuery 1.4, you can also pass in an options object as the
// second argument to the jQuery function when creating a new element.
var graph = $("<p/>", {
  id: "test",
  className: "fancy",
  html: "<b>hello</b> <i>world</i>",
  click: function() {
    console.log( $(this).text() );
  }
});






////////////////////////////
// Manipulating the document
////////////////////////////

// Once you've created something, how do you attach it to the document?
var graph = $("<p>new content</p>");

graph.prependTo("#target");    // Inside #target, at the beginning.
graph.appendTo("#target");     // Inside #target, at the end.
graph.insertBefore("#target"); // Outside #target, before.
graph.insertAfter("#target");  // Outside #target, after.
graph.replaceAll("#target");   // Replace #target completely.

// These methods do similar things, but chain a little differently.
$("#target").prepend("<p>new content</p>");
$("#target").append("<p>new content</p>");
$("#target").insert("<p>new content</p>");
$("#target").after("<p>new content</p>");
$("#target").replaceWith("<p>new content</p>");



// Note that when you append an element to the DOM, it gets MOVED to
// the new location, NOT copied. Elements can exist in only one place
// in the document (or in a fragment in memory) at a time.
var elem = $(".my-element");
elem.length // 1

// Move elem somewhere else.
elem.appendTo("#new-parent");

// Yep, there's still only one of them.
$(".my-element").length // 1



// If you really want to duplicate an element, clone it!
var elem = $(".my-element");
elem.length // 1

// First, clone elem. Then, move the clone somewhere else.
elem.clone().appendTo("#new-parent");

// When you clone an element with an id, you need to change (or remove)
// the id before appending it into the document, because HTML doesn't allow
// duplicate ids in the document!
elem.clone().removeAttr("id").appendTo("#new-parent");

// If you also want to clone event handlers and data, pass true to .clone().
$("a").first().clone(true).insertAfter("#new-parent");






///////////////////////////////////////////
// Do as much work off-document as possible
///////////////////////////////////////////

// This adds the class AFTER the element has been appended to the
// document, which causes an unnecessary reflow.
$("<p>new content</p>").appendTo("#target").addClass("highlight");

// This adds the class before appending the element, while it is still
// only in memory.
$("<p>new content</p>").addClass("highlight").appendTo("#target");






///////////
// Chaining
///////////

// You can select elements, filter them, and manipulate them in multiple
// steps, using variables.
var graphs = $("p");
var graphsWithAnchors = graphs.has("a");
graphsWithAnchors.addClass("highlight");

// Because jQuery methods are chainable, you can often forgo variables.
$("p").has("a").addClass("highlight");

// Although it's a good idea to store a jQuery object in a variable
// instead of re-selecting the same set of elements later on!
var graphs = $("p").has("a");

graphs.addClass("highlight");

$("#my-button").on("click", function() {
  graphs.removeClass("highlight");
});



// Whenever you reduce a set of elements down to a subset using a jQuery
// filtering method, get all new elements using a jQuery traversal method,
// or use a jQuery method as a setter, jQuery returns a jQuery object.

// When a jQuery method returns a jQuery object, you can chain.

// Let's break this chain down:
$("ul").children().not(":last-child").addClass("highlight").html();

$("ul") // select: returns a jQuery object.
  .children() // traverse: returns a new jQuery object.
    .not(":last-child") // filter: returns a new jQuery object.
      .addClass("highlight") // set: returns the same jQuery object.
        .html(); // get: returns a string of HTML, not a jQuery object!






/////////
// Events
/////////



// Use the "on" method for binding event handlers.
$(window).on("resize", function() {
  repositionModalDialog();
});

// Just note that when you use the "off" method to unbind event handlers,
// you unbind ALL event handlers of that type.
$(window).off("resize");


// But if you bind using a named function...
$(window).on("resize", repositionModalDialog);

// ...and unbind using the same named function, only the event handlers
// bound using that function will be unbound, leaving other event
// handlers of that type untouched.
$(window).off("resize", repositionModalDialog);


// And if you bind using namespaces...
$(window).on("resize.mymodal", function() {
  repositionModalDialog();
});

// ...and unbind using the same namespace, only the event handlers
// bound with that namespace will be unbound, leaving other event
// handlers of that type untouched.
$(window).off("resize.mymodal");


// You can even bind multiple event types at once, with optional
// namespaces...
$(window).on("resize.mymodal scroll.mymodal", function() {
  repositionModalDialog();
});

// ...and unbind them ALL at once, using just the namespace.
$(window).off(".mymodal");






///////////////////
// Event Delegation
///////////////////

// Instead of binding event handlers to every individual element...
$("#my-list li").on("mouseover mouseout", function(event) {
  $(this).toggleClass("highlight");
});

// Consider using event delegation to bind a single event handler to an
// ancestor element.
$(document).on("mouseover mouseout", "#my-list li", function(event) {
  $(this).toggleClass("highlight");
});

// Not only does event delegation do less work up-front, but it also
// allows matched elements to be added after-the-fact.
$("#my-list").append("<li>OMG</li><li>SUPER</li><li>AWESOME</li>");

// It's recommended that you attach the event handler to the closest
// ancestor element that makes sense. Like the list, table or "widget."
$("#my-list").on("mouseover mouseout", "li", function(event) {
  $(this).toggleClass("highlight");
});






///////
// Ajax
///////

// jQuery's $.ajax() method accepts an options object where we can specify
// extra data we want to send, which HTTP method (GET, POST, etc) to use,
// what type of data we expect to receive, and how to react when the request
// succeeds or fails.
$.ajax("/data/people.json", {
  data: {count: 3},
  type: "GET",
  dataType: "json",
  success: function(res) {
    $("#target").html("<h2 class=well>" + res.people[0].name + "</h2>");
  },
  error: function(req, status, err) {
    console.error("Something went wrong! Status: %s (%s)", status, err);
  }
});



// jQuery provides a number of Ajax convenience methods that are basic
// wrappers around the $.ajax() method.

// The $.get() method accepts a url, optional data object, optional success
// handler, and optional data type.
$.get("/data/people.json", {count: 3}, function(res) {
  console.log("Response", res);
});

// It's basically just a shorter way of writing this:
$.ajax("/data/people.json", {
  data: {count: 3},
  type: "GET",
  success: function(res) {
    console.log("Response", res);
  }
});

// The $.post() method is just like the $.get() method but explicitly
// specifies a type of "POST" (HTTP method)
$.post("/data/save", {name: "Bocoup"}, function(res) {
  console.log("Response", res);
}, "json");

// The $.getJSON() method is just like the $.get() method but explicitly
// specifies a dataType of "json"
$.getJSON("/data/people.json", {count: 3}, function(res) {
  console.log("Response", res);
});

// The $.getScript() method is just like the $.get() method but explicitly
// specifies a dataType of "script"
$.getScript("/assets/js/test.js");

// And if you need to run JavaScript after your JavaScript, you can.
$.getScript("/assets/js/test.js", function() {
  $("#target h2").append("!!!").attr("class", "alert alert-success");
});

// You actually don't need to specify a success callback for any of the
// Ajax methods.
$.ajax("/data/people.json");
$.get("/data/people.json");
$.getJSON("/data/people.json");
$.post("/data/save", {name: "Bocoup"});



// But if you don't specify a success callback, how can you do something
// with the inevitable response? Because Ajax methods return a jqXHR
// object, and that object has methods of its own.
var jQXHR = $.getJSON("/data/people.json");

jQXHR.then(function(res) {
  $("#target").html("<h2 class=well>" + res.people[0].name + "</h2>");
}, function(req, status, err) {
  console.log("Something went wrong! Status: %s (%s)", status, err);
});

// We can specify as many success handlers as we want, using the .done()
// method, as many error handlers as we want, using the .fail() method, and
// a single success (and optional error) handler using the .then() method.
var req = $.getJSON("/data/people.json");
req.done(onSuccess1, onSuccess2);
req.fail(onError1, onError2, onError3);
req.done(onSuccess3);
req.then(onSuccess4, onError4);

// If we want to specify a handler that runs whether or not the request
// succeeds or fails, we can use the .always() method.
req.always(onSuccessOrError);



// Have you ever done this? You want to execute code when multiple Ajax
// requests have completed, and the easiest way is to do them serially by
// nesting callbacks. But this is gross.
$.getJSON("/data/person.json", function(data) {
  $.get("/templates/person.tmpl", function(tmpl) {
    // This code executes once both requests have resolved.
    doSomething(data, tmpl);
  });
});

// Using the $.when() method, we can combine multiple Ajax requests into
// a single object that behaves just like a jQXHR. The object that $.when
// returns is known as a Deferred (jQXHR objects are Deferreds as well).
var dataReq = $.getJSON("/data/person.json");
var tmplReq = $.get("/templates/person.tmpl");

$.when(dataReq, tmplReq).then(function(data, tmpl) {
  // This code executes once both requests have resolved.
  doSomething(data[0], tmpl[0]);
});



// You can even create your own Deferred objects. In this example, the
// getTemplate function returns a Deferred object. When the underlying
// Ajax request completes successfully, the Deferred object is resolved
// with the compiled template.
var getTemplate = function(id) {
  var dfd = $.Deferred();
  $.get("/templates/" + id + ".tmpl").when(function(res) {
    dfd.resolve( _.template(res) );
  }, function(req, status, err) {
    dfd.reject(status);
  });
  return dfd.promise();
};

var dataReq = $.getJSON("/data/person.json");
var tmplReq = getTemplate("person");

$.when(dataReq, tmplReq).then(function(data, tmplFn) {
  // This code executes once both requests have resolved.
  doSomething(data[0], tmplFn);
});







////////////////
// Learn the API
////////////////

// Bookmark api.jquery.com and go there EVERY SINGLE DAY!

// Find cool utilities like $.type:
$.type(1)               // "number"
$.type(new Number(1))   // "number"
$.type({a: 1})          // "object"
$.type([2, 3])          // "array" Awesome!

// Or the more-specific type-related functions:
$.isArray([2, 3])       // true
$.isFunction($)         // true
$.isPlainObject({})     // true

// Or the $.extend() method for cloning and merging objects:
var obj = {a: [1,2,3], b: [4,5,6]};

// Shallow clone an object.
var shallowClone = $.extend({}, obj);

// Deep clone an object.
var deepClone = $.extend(true, {}, obj);

// Merge objects, preserving the original object.
var mergedObj = $.extend({}, obj, {b: true, c: false});

// Merge objects, modifying the original object.
$.extend(obj, {b: true, c: false});





