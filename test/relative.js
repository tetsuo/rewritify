var rewrite = require('..');
var test = require('tape');
var browserify = require('browserify');
var vm = require('vm');

test('relative', function (t) {
  t.plan(1);

  var b = browserify();

  b.add(__dirname + '/relative/x.js');

  b.transform(rewrite, {
    mapping: {
      eyo: './y.js',
      foo: './b/x.js',
      quux: './b/c/w.js',
      bar: './b/y.js',
      baz: './b/c/x.js',
      spazz: './a/w.js'
    },
    basedir: __dirname + '/relative'
  });

  b.bundle(function (err, src) {
    if (err) throw err;
    var ctx = {
      console: { log: log }
    };
    vm.runInNewContext(src, ctx);
    function log (s) {
      t.equal(s, 'yepeyofooquuxbazzquxspazz');
    }
  });
});