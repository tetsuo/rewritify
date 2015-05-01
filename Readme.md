# rewritify

browserify transform that rewrites require paths.

# example

```js
browserify(__dirname + '/index.js')
  .transform(rewritify, {
    mapping: {
      'bar': './bar/lib' # relative to basedir
    },
    basedir: __dirname + '/foo',
    extensions: ['coffee', 'js']
  });
```

Now you can do `require('bar/x')` from anywhere.

# api

## rewritify([file,] opts)

`opts` object can have these properties:

- `mapping` lets you map a name into a lookup path. You can also use this per-module or per-file basis like [browser field](https://github.com/substack/node-browserify#browser-field).
- `basedir` is used to resolve relative paths defined in mapping property, by default this is `dirname` of the processed file.
- `extensions` is an array of optional extra extensions for module lookup machinery to use when the extension has not been specified.

# license

mit