var rewrite = require('..');
var test = require('tape');
var browserify = require('browserify');
var vm = require('vm');

test('nested', function (t) {
  t.plan(1);

  var b = browserify();

  b.add(__dirname + '/nested/x.js');

  b.transform(rewrite, {
    mapping: {
      foo: './qux/quux',
      'sp/azz': './baz/w.js'
    },
    basedir: __dirname + '/nested'
  });

  b.bundle(function (err, src) {
    if (err) throw err;
    var ctx = {
      console: { log: log }
    };
    vm.runInNewContext(src, ctx);
    function log (s) {
      t.equal(s, 'yepbazbar');
    }
  });
});