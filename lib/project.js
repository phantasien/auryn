var async = require('async');
var config = require('./config');
var fs = require('fs');
var ignore = require('ignore');
var mkdirp = require('mkdirp');
var path = require('path');
var shell = require('shelljs');


var project = module.exports = {};

var ignores = [
  '/dock',
];

function syncElement(dir, destDir, element, done) {
  var source = path.join(dir, element);
  var destination = path.join(destDir, element);
  var stats = null;

  async.series([
    function readStats(next) {
      fs.stat(source, function (err, result) {
        if (err) return next();

        stats = result;
        next();
      });
    },
    function mkdir(next) {
      if (!stats || !stats.isFile()) return next();

      mkdirp(path.dirname(destination), function () {
        next();
      });
    },
    function pipe(next) {
      if (!stats || !stats.isFile()) return next();

      var readStream = fs.createReadStream(source);
      var writeStream = fs.createWriteStream(destination);

      readStream.pipe(writeStream);
      readStream.on('end', next);
    }
  ], done);
}

project.read = function (dir, done) {
  fs.readFile(path.join(dir, 'package.json'), 'utf8', function (err, data) {
    done(err, JSON.parse(data));
  });
};

project.mergeWithConfig = function (dir, done) {
  project.read(dir, function (err, def) {
    config.getAll(function (err, cfg) {
      cfg.project = def;
      done(err, cfg);
    });
  })
};

project.rsync = function (dir, destination, done) {
  var relpaths = shell.find(dir).map(function (element) {
    return path.relative(dir, element);
  });
  var filtered = ignore().addPattern(ignores).filter(relpaths);

  async.each(filtered, syncElement.bind(null, dir, destination), done);  
};
