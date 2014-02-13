# Browserify Transform for transforming jade templates to react

## Setup

When creating your browserify bundle, just add this line:

```js
bundle.transform( require( "jade-reactify" ) );
```

or if you are a command line cowboy, something along the lines of

```js
browserify -t jade-reactify entry.js -o bundle.js
```

## Usage

```js
var template = require( "./template.jade" );
template({key: "value"}, document.body );
```

It will render your template and sets `document.body`'s `innerHTML`.

## Warning

Internally it uses [jade-react](https://github.com/duncanbeevers/jade-react) which doesn't fully support jade rendering, like children elements etc. So sometimes it returns `[Object object]` :(

## Licence

MIT
