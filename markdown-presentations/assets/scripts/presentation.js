$(document).ready(function(){
  var cm = CodeMirror;
  $('code.javascript, code.html, code.html-run, code.html-run-only, code.css, code.shell, code.bash, code.notes').each( function() {
    var $this = $(this);
    var $container = $this.closest('pre');
    var type = this.className;
    var mode = type.split('-')[0];
    var encodedContent = $this.html();
    var decodedContent = $this.text();

    // if we wanted to run any html's
    if ( /html-run/.test( type ) ) {
      var $div = $('<div class="run">')
        .html( decodedContent );
      $container.after( $div );
    }
    // make the editor if we wanted to
                if ( mode === "html" ) {
                  mode = "htmlmixed";
                }
                if ( mode === "bash" ) {
                  mode = "shell";
                }
    if ( !/html-run-only/.test( type ) && !/notes/.test( type )) {
      var editor = cm( function( el ) {
        $container.after(el);
      }, {
        mode: mode,
        value: decodedContent,
        tabMode: 'indent'
      });
    }

    // hide the original markup
    $container.hide();

          if ( /notes/.test( type ) ) {
            var a = $('<a class="notes">notes...</a>').on( 'click', function(e) {
              e.preventDefault();
              $container.slideToggle();
            });
            $container.before( a );
          }





  });

 // when any click event happens and it was on a .bob
  $( document ).on( 'click', '.bob', function() {
    // hide the .bob element. when done...
    $.when( $( this ).hide( 'slow' ) ).done( function() {
      // remove it
      $( this ).remove();
    });
  });

  $( '#addThreeBobs' ).on( 'click', function() {
    // make i = 0 - do stuff while it's less than three
    // and increment it once every time it runs
     for ( var i = 0; i < 3; i++ ) {
       var $img = $('<img class="bob" src="assets/img/bob.png">');
       $img.appendTo('#coop').show('slow');
     }
  });

  var canvasElem = document.getElementById('myCanvas');
  if ( canvasElem ) {
    var ctx = canvasElem.getContext('2d');
    ctx.fillStyle = "rgba(255,0,0,.5)";
    ctx.fillRect(10, 10, 100, 100);
    ctx.fillStyle = "rgba(0,0,255,.5)";
    ctx.fillRect(60, 60, 100, 100);
  }

  $('#geolocation').click(function() {
        function success(position) {
          var result = 'Your latitude is ' +
                       position.coords.latitude +
                       ' and your longitude is ' +
                       position.coords.longitude;
          alert(result);
        }
        function err() {
          alert('Could not get your location.');
        }
        navigator.geolocation.getCurrentPosition(success, err);
    });

    $('#localStorageSet').submit(function(e) {
        var val = $('#localStorageInput').val();
        localStorage.setItem("myValue", val);
        alert('Value set to ' + val);
        e.preventDefault();
    });

    $('#localStorageGet').submit(function(e) {
        alert(localStorage.getItem("myValue"));
        e.preventDefault();
    });

    $("#superBobGo").click(function () {
       $("#superbob").removeClass("superbob").addClass("superbob");
       $("#superbob").show();
    });


  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }

  var files = document.getElementById('files');

  if ( files ) {
    files.addEventListener('change', handleFileSelect, false);
  }

   function handleFileSelect2(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
    }
    document.getElementById('drag-list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  // Setup the dnd listeners.
  var dropZone = document.getElementById('drop_zone');
  if ( dropZone ) {
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect2, false);
  }
});
