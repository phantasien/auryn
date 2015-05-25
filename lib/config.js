var _ = require('lodash');
var defaults = require('./defaults');
var fs = require('fs');
var osenv = require('osenv');
var path = require('path');


var USER_CONFIG_PATH = path.join(osenv.home(), '.aurynrc');
var config = module.exports = {};


config.get = function (parameter, callback) {
  fs.readFile(USER_CONFIG_PATH, 'utf8', function (err, data) {
    var ctx = err ? defaults : _.merge({}, defaults, JSON.parse(data));

    parameter.split('.').every(function (key) {
      if (! _.has(ctx, key)) {
        ctx = null;
        return false;
      }

      ctx = ctx[key];
      return true;
    });

    callback(null, ctx || '');
  });
};

config.getAll = function (callback) {
  fs.readFile(USER_CONFIG_PATH, 'utf8', function (err, data) {
    callback(null, err ? defaults : _.merge({}, defaults, JSON.parse(data)));
  });
};


config.set = function (parameter, value, callback) {
  fs.readFile(USER_CONFIG_PATH, 'utf8', function (err, data) {
    var fullCtx = err ? defaults : _.merge({}, defaults, JSON.parse(data));
    var ctx = fullCtx;

    _.initial(parameter.split('.')).forEach(function (key) {
      if (! _.has(ctx, key)) ctx[key] = {};

      ctx = ctx[key];
    });

    ctx[_.last(parameter.split('.'))] = value;
    fs.writeFile(USER_CONFIG_PATH, JSON.stringify(fullCtx, null, 2), callback);
  });
};