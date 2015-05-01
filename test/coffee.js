var rewrite = require('..');
var test = require('tape');
var browserify = require('browserify');
var coffeeify = require('coffeeify');
var vm = require('vm');

test('coffee', function (t) {
  t.plan(1);

  var b = browserify();

  b.add(__dirname + '/coffee/a/x.coffee');
  b.transform(coffeeify);
  b.transform(rewrite, {
    mapping: {
      'foo': './y.js',
      'bar': './a/y.coffee'
    },
    basedir: __dirname + '/coffee',
    extensions: ['.coffee']
  });

  b.bundle(function (err, src) {
    if (err) throw err;
    var ctx = {
      console: { log: log }
    };
    vm.runInNewContext(src, ctx);
    function log (s) {
      t.equal(s, 'foobar');
    }
  });
});