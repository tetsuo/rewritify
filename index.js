var inherits = require('util').inherits;
var path = require('path');
var Transform = require('readable-stream/transform');
var PassThrough = require('readable-stream/passthrough');
var td = require('transform-deps');


module.exports = rewrite;

function rewrite (file, opts) {
  if (!opts) opts = {};
  var extensions = opts.extensions || ['js'];
  var pat = new RegExp('\.(' + extensions.join('|') + ')$');
  if (!pat.test(file)) return new PassThrough();
  if (!(this instanceof rewrite)) return new rewrite(file, opts);
  this.src = '';
  this.depth = path.dirname(file).replace(opts.basedir, '').split('/').length;
  this.mapping = opts.mapping || {};
  Transform.call(this);
}
inherits(rewrite, Transform);

rewrite.prototype._transform = function (row, enc, next) { this.src += row; next(); };

rewrite.prototype._flush = function (next) {
  var self = this;
  var keys = Object.keys(this.mapping);
  var src = td(this.src, function (id) {
    var s = id.split('/');
    var key = s[0];
    if (~keys.indexOf(key)) {
      s.shift();
      var r = '';
      for (var i = 0; i < self.depth-2; i++) r += '../';
      r += self.mapping[key];
      s.unshift(r);
    }
    ret = s.join('/');
    return ret;
  });
  this.push(src);
  next();
};

