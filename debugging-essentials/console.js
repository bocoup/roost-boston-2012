///////////////////////////
// Logging with the console
///////////////////////////

function console101() {

  // Remember the "alert" function? WELL, FORGET ABOUT IT! NOW!!
  alert(1 + 2);

  // In modern JavaScript environments, the "console" object has a number of
  // useful debugging methods.

  // You can execute code directly in the console, and you can also use
  // the console in your normal code:
  console.log(1, 2, 3); // logs: 1 2 3
  console.log({a: 1, b: 2}); // logs: { a: 1, b: 2 }


  // Older browsers (IE <= 7) don't have a console object, and IE 8 doesn't
  // have a console object unless the developer tools are open.
  console.log("test"); // Error: 'console' is undefined

  // When supporting older browsers, you should test that the console exists
  // before using it.
  function log(msg) {
    if (window.console && console.log) {
      console.log(msg);
    }
  }
  log("test"); // Works or fails gracefully.


  // Logging can be done printf-style in most implementations, although the
  // output might vary.

  // Node.js:
  console.log("Number: %d, String: %s, Object: %j", 123, "foo", {a: "xyz"});
  // logs: Number: 123, String: foo, Object: {"a":"xyz"}

  // WebKit Inspector:
  console.log("Number: %d, String: %s, Object: %o", 123, "foo", {a: "xyz"});
  // logs: Number: 123, String: foo, Object: >Object

  // Firefox (with Firebug):
  console.log("Number: %d, String: %s, Object: %o", 123, "foo", {a: "xyz"});
  // logs: Number: 123, String: foo, Object: Object { a="xyz"}

  // Internet Explorer 8+:
  console.log("Number: %d, String: %s, Object: %o", 123, "foo", {a: "xyz"});
  // logs: LOG: Number: 123, String: foo, Object: [object Object]



  // Logging can usually be done with four levels:
  console.log("level 1");
  console.info("level 2");
  console.warn("level 3");
  console.error("level 4"); // console.error might throw an exception, too.



  // In cases where console.log defaults to displaying an object using an "HTML"
  // view, console.dir can be used to display an object using a "Plain Old
  // JavaScript" view. Compare these two in Firebug or WebKit Inspector:
  console.log(document.body);
  console.dir(document.body);


  // Console tips

  // In the console, $0 refers to the element you're currently inspecting!

  // Different browsers have different methods, such as markTimeline,
  // profile, profileEnd, assert, and more.
  console.assert(a === b, a, "equals", b);
}
