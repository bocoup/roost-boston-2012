
$(function() {

  // Exception handling and the debugger statement

  function getSomeJSON() {
    return '{prop: "Hello, world!"}';
  }

  $(".throw-an-exception").on("click", function() {
    var json = getSomeJSON();
    var data = JSON.parse(json);
    $(this).html(data.prop);
  });


  // Setting breakpoints

  function addAndLog(a, b) {
    console.log("%d + %d = %d", a, b, a + b);
  }

  $(".set-breakpoint").on("click", function() {
    var i, j;
    for (i = 1; i <= 3; i++) {
      for (j = 4; j <= 6; j++) {
        addAndLog(i * 10, j);
      }
    }
    console.log("done!");
  });


  // Debugging mysterious errors

  $(".mysterious-jquery-error").on("click", function() {
    $("..").html("this is going to fail horribly");
  });

});
