# Dive Into HTML5
#### Dan Heberden
#### dan@bocoup.com
#### @danheberden


# HTML Basics

## What *IS* HTML?
HTML is a way to express the layout of a document by either labeling copy or inserting elements the browser will then style


### Typical Markup
```html-run
<p>This is paragraph <b>one</b>.</p>
<p>This is paragraph <i>two</i></p>
```

## Nesting order matters!
```html
<p>This is paragraph <b>one.</p><p></b>.This is paragraph <i>two</i></p>"
```
The browser isn't even going to know what to do with this

## So An HTML tag...
Is just stuff enclosed by < and >

## What kind of Elements are there?

### Void Elements
`area, base, br, col, command, embed, hr, img, input, keygen, link, meta, param, source, track, wbr`

### Raw Text Elements
These are elements that take content to be used elsewhere like `script` and `style`

### Comments
These get ignored by the browser for you to comment your markup
`<!-- I'm a comment! -->`

### Normal Elements
Pretty much everything else: `p, div, strong, i, b...`

### Most normal Elements are *very* normal - they don't actually mean that much
* Elements like `<i>`, `<em>`, `<b>`, `<strong>`, `<h1>` through `</h6>`, `<p>`, `<ul>`, `<li>`, etc.. are just "things" but they have default styling from the browser and *some* have some special abilities (like lists)


## Element Attributes

```html
<div id="this-is-a-unique-id-of-this-div">HTML5!!!</div>
<input type="input">
```

Makes sense: the label of the attribute (i.e. what it's called) with an assignment to a value.


#### First, a DOCTYPE to tell the browser what we're doing

```html
<!DOCTYPE html>
```

This gets the browser out of quirks mode. Also notice the HTML5 DOCTYPE - no more of the
awful `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">`
grossness.

#### A typical HTML Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
        <meta charset="utf-8">
        <title>My HTML Page</title>
</head>
<body>
        <h1>We could add a heading!</h1>
        <p>It's a paragraph! You could make links to cool
           sites like <a href="http://bocoup.com/">Bocoup</a>
           or add images of kitten.
           <img src="http://placekitten.com/400/150">
        </p>
</body>
</html>
```

## HTML Resources

* Boilerplate: http://html5boilerplate.com/
* Validator: http://html5.validator.nu/
* Tutorials: http://htmldog.com/ http://diveintohtml5.info/ http://www.html5rocks.com/en/
* Reference: https://developer.mozilla.org/


# HTML5 & You

If you heard HTML5 is better than a unicorn, you heard right!

* DOCTYPE is WAY easier to remember
* Write clean HTML with more expressive elements
* New elements to accomplish much more in the browser
* New APIs for those elements to not only have them on the page, but interact with them


## Some addendas, um, provisos... some quid pro quo's

### HTML is pretty flexible

Because it isn't based on XML, HTML can be a bit flexible with some tags if you wish to not either
* close them
* self close them

#### Self close them?
In XML, a 'node' that is all by itself would need to be self closed - like an image tag would have to be `<img />` instead of `<img>` so that the parser wasn't forever looking for `</img>`.

```html
<ul>
  <li>some text
  <li>An li can't have a child li, so the browser knows to just close it
</ul>
or
<table>
  <tr>
    <td>A Column
    <td>Another Column
</table>
```

### Attribute flags can be simplified

While this is perfectly valid:

```html-run
<input type="checkbox" checked="checked"> Checked Already
```

The extra `="checked"` is unncessary - the browser knows what you mean:

```html-run
<input type="checkbox" checked> Checked Already
```

## So about those non-normal elements

#### Void Elements

These are things like `<input>` and `<img>` that are elements in-and-of themselves. They aren't formatting or containers, they are actual *things*. Thus, they cannot have content. So

```html
<input type="text"></input>
```
is invalid because input could *never* have content

This is still valid

```html
<input type="text" />
```

but not necessary. This is totally legit:

```html
<input type="text">
```

## So we talked about HTML a bunch, but what's new?

* Semantic Elements
* New Input Types
* CSS3
* Drag & Drop
* Canvas
* WebGL
* Video & Audio
* Golocation
* Web Storage
* Web Workers
* Offline Web Applications
* Web Sockets
* SVG
* MathML

### HTML5 Semantic Elements

Use them!

```html
<article>
<aside>
<command>
<datalist>
<details>
<figure>
<figcaption>
<footer>
<header>
<hgroup>
<mark>
<meter>
<nav>
<output>
<section>
<summary>
<time>
```

### Semantic Elements Example
```html-run
<header>
    <h1>Build New Games</h1>
</header>
<article>
    Published <time>2011-01-28</time>
    <hgroup>
        <h1>Some article on BNG</h1>
        <h2>By Greg Smith</h2>
    </hgroup>
    <summary>
        This is an article about my day.
    </summary>
    <section>
        <p>My article content.</p>
        <aside>By the way...</aside>
        <p>More content</p>
    </section>
    <section>
        <p>Second section</p>
    </section>
</article>
<footer>
    © 2011 Greg Smith
</footer>
```

### HTML5 Input Types

Your mileage may vary

```html-run
<input type=tel>
<input type=search>
<input type=url>
<input type=email>
<input type=datetime>
<input type=date>
<input type=month>
<input type=week>
<input type=time>
<input type=datetime-local>
<input type=number>
<input type=range>
<input type=color>
```

Old browsers treat these as `type="text"`

Check out [caniuse.com](http://caniuse.com/#feat=forms) for compatibility information

### When can I use HTML5?

* Modern browsers. IE9, Firefox, Chrome, Safari, Opera
* Designed to be ignored by older browsers
* Workarounds for older browsers. IE6, IE7, IE8
* Don't wait until 2022
* html5readiness.com
* caniuse.com

### Supporting Older Browsers

#### Semantic elements in older browsers

[HTML5 Shim / Shiv](http://code.google.com/p/html5shim/)

#### Feature Detection

[Modernizr](http://www.modernizr.com/)

#### Polyfills

[Go to Modernizr.com and click cross-browser polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills)

# Form Validation

```html-run
Email Address: <input type="email" name="email"
  required placeholder="Enter a valid email address">
```

```html-run
Website: <input type="url" name="website"
   required pattern="https?://.+">
```

```html-run
Age: <input type="number" size="6"
  name="age" min="18" max="99" value="21">
```


## Data Attributes

A standard way to attach data to elements

```html
<div id="person" data-nickname="Bob">Bocoup Mascot</div>
```

### dataset:

* chrome 8+
* firefox 6+
* opera 11.10+
* safari 6+
* no ie

```javascript
var element = document.getElementById('person');
element.dataset.nickname;
```

### getAttribute: supported everywhere

```javascript
 element.getAttribute('data-nickname');
```

### the jQuery way

```javascript
$("#person").data("nickname");
```

# HTML5 - not just markup

## Video

```html-run
<video src="assets/video/popcorn.webm" poster="assets/video/poster.png" controls>
  Your browser does not support the video element.
</video>
```

### Fully Scriptable

```javascript
document.getElementById("#video").play();
```

http://popcornjs.org/

### Video format support is complicated

http://en.wikipedia.org/wiki/HTML5_video#Browser_support

## Audio

Frederic Chopin - Opus 10 - Twelve Grand Etudes in F minor

```html-run
<audio controls>
  <source src="assets/audio/chopin.mp3" type="audio/mpeg">
  <source src="assets/audio/chopin.ogg" type="audio/ogg">
  Your browser does not support the audio element.
</audio>
```

![Audio Chart](assets/img/audio-chart.png)

### mp3 + ogg

## Canvas

```html
<canvas id="myCanvas" width="300" height="300">
  Canvas is not supported in your browser
</canvas>
```

```javascript
var canvasElem = document.getElementById('myCanvas');
var ctx = canvasElem.getContext('2d');
ctx.fillStyle = "rgba(255,0,0,.5)";
ctx.fillRect(10, 10, 100, 100);
ctx.fillStyle = "rgba(0,0,255,.5)";
ctx.fillRect(60, 60, 100, 100);
```

```html-run-only
<canvas id="myCanvas" width="300" height="300">
  Canvas is not supported in your browser
</canvas>
```

## Geolocation

```javascript
function success(position) {
  var result = 'Your latitude is ' +
               position.coords.latitude +
               ' and your longitude is ' +
               position.coords.longitude);
  alert(result);
}

function err() {
  alert('Could not get your location.');
}

navigator.geolocation.getCurrentPosition(success, err);
```

```html-run-only
<button id="geolocation">Get My Location!</button>
```

## Web Storage

```javascript
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
```

```html-run-only
<form id="localStorageSet" style="padding: 0;">
    <input id="localStorageInput">
    <input type="submit" value="Set Stored Value">
</form>
<form id="localStorageGet">
    <input type="submit" value="Get Stored Value">
</form>
```

[lawnchair](http://westcoastlogic.com/lawnchair/)

## Web Sockets

* Instant communication between client and server

* Server can "Push" to client rather than waiting for a request

* A good library to use is Socket.IO

```javascript
var socket = io.connect('http://localhost');
socket.on('news', function(data) {
  console.log(data);
  socket.emit('my other event', {my: 'data'});
});
```

Useful for things like synchronous chat, online games

## Feature Detection

#### Check if feature is there, don't detect browser

[Modernizr](http://modernizr.com/)

```javascript
if ( Modernizr.canvas ) {
  // do something with canvas
}
else {
  // fallback for people with older browsers
}
```

## Polyfills

* Provide modern features to older browsers

* Conditional resource loader like yepnope is useful

```javascript
yepnope({
  test : Modernizr.geolocation,
  yep  : 'normal.js',
  nope : ['polyfill.js', 'wrapper.js']
});
```

Modernizr doesn't provide polyfills, but they have a [great list of polyfills you can use](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills)


# File API

```javascript
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

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
```

```html-run
<input type="file" id="files" name="files[]" multiple />
<output id="list"></output>
```

### Drag and Drop

```javascript
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
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
```

```html-run
<div id="drop_zone">Drop files here</div>
<output id="drag-list"></output>
```


# SVG

```html-run
 <style>
    svg {
      height: 180px;
    }
    rect {
      stroke: white;
      fill: blue;
    }
  </style>
  <svg>
    <rect stroke-width="2px"
          x="50px"
          y="50px"
          width="100px"
          height="100px">
    <animateTransform
        attributeName="transform"
        type="rotate"
        from="0,100,100" to="360,100,100"
        begin="0s" dur="3s"
        repeatCount="indefinite"/>
    </rect>
  </svg>
```

* IE 6-8 NONE
* IE 9+ Partial
* Firefox Partial 1.1 Full
* Firefox 3 More 1.1 Full
* Chrome / Safari Partial 1.1 Full
* Opera 8 1.1 Tiny
* Opera 9 1.1 Basic / Partial 1.1 Full
* Opera 9.5 Partial 1.2 Basic

# That's all I got - any questions?

Dan Heberden
dan@bocoup.com
@danheberden
