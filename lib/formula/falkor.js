var config = require('../config');
var fs = require('fs');
var ncp = require('ncp');
var path = require('path');


var falkor = module.exports = {};
var falkorPath = path.join(__dirname, '..', '..', 'deps', 'falkor');


falkor.name = 'falkor';
falkor.label = 'Mobile library sources';


falkor.validate = function (done) {
  config.getAll(function (err, cfg) {
    var message = 'falkor folder was not found';

    fs.exists(cfg.falkor.base, function (exists) {
      if (!exists) return done({message: message});
    
      done();
    });
  });
};

falkor.install = function (done) {
  config.getAll(function (err, cfg) {
    ncp(falkorPath, cfg.falkor.base, done);
  });
};
