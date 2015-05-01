var rewrite = require('..');
var test = require('tape');
var browserify = require('browserify');
var vm = require('vm');

test('builtin', function (t) {
  t.plan(1);

  var b = browserify();

  b.add(__dirname + '/builtin/x.js');

  b.transform(rewrite, {
    mapping: {
      'foo': 'querystring'
    }
  });

  b.bundle(function (err, src) {
    if (err) throw err;
    var ctx = {
      console: { log: log }
    };
    vm.runInNewContext(src, ctx);
    function log (s) {
      t.equal(s, 'a=1&b=2');
    }
  });
});