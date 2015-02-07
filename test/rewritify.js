var test = require('tape');
var browserify = require('browserify');
var rewritify = require('..');
var vm = require('vm');

test(function (t) {
  t.plan(2);
  var b = browserify();
  b.add(__dirname + '/fixtures/a/x.js');
  b.add(__dirname + '/fixtures/b/y.js');
  b.transform(rewritify, {
    basedir: __dirname + '/fixtures',
    mapping: {
      qux: '../c/d/e/f'
    }
  });
  b.bundle(function (err, res) {
    vm.runInNewContext(res, {
      console: { log: log }
    });
    function log (msg) { t.equal(msg, 'quux'); }
  });
});