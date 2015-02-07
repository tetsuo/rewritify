# rewritify

browserify transform that rewrites require paths.

# usage

```js
browserify('./foo.js')
  .transform(rewritify, {
    mapping: {
      'bar': '../bar/lib'
    },
    basedir: __dirname + '/baz',
    extensions: ['coffee', 'js']
  });
```

# license

mit