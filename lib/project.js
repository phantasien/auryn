var config = require('./config');
var fs = require('fs');
var path = require('path');


var project = module.exports = {};


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
