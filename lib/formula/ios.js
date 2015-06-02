var async = require('async');
var child = require('child_process');
var config = require('../config');
var devnull = require('dev-null');
var falkor = require('./falkor');
var fs = require('fs');
var iosSDK = require('./ios-sdk');
var mkdirp = require('mkdirp');
var os = require('os');
var path = require('path');
var python = require('./python');
var shell = require('shelljs');


var ios = module.exports = {};
var falkorPath = path.join(__dirname, '..', '..', 'deps', 'falkor');
var bastianPath = path.join(falkorPath, 'deps', 'bastian');


ios.name = 'ios';
ios.label = 'iOS Library';
ios.dependencies = [python, iosSDK];


ios.validate = function (done) {
  config.getAll(function (err, cfg) {
    var message = 'ios lib was not found';
    var outPath = path.join(cfg.falkor.base, 'out', 'jsc-ios-simulator');

    fs.exists(outPath, function (exists) {
      if (!exists) return done({message: message});

      var result = shell.find(outPath).filter(function (file) {
        return file.match(/(libfalkor.a)$/);
      });
    
      done(result.length > 0 ? null : {message: message});
    });
  });
};



ios.install = function (done) {
  config.getAll(function (err, cfg) {
    var outPath = path.join(cfg.falkor.base, 'out', 'jsc-ios-simulator');
    var gypScript = path.join(
      cfg.falkor.base,
      'deps',
      'bastian',
      'tools',
      'gyp_bastian'
    );

    var args = [
      '-Dbastian_project=' + cfg.falkor.base,
      '-Dbastian_engine=jsc',
      '-DOS=ios-simulator',
      'falkor.gyp'
    ];

    function buildProj(name, next) {
      var make = child.execFile('xcodebuild', [
        '-project',
        name + '.xcodeproj',
        'SYMROOT=' + outPath
      ], {cwd: outPath});
      
      make.stdout.on('end', next);
      make.stdout.pipe(devnull());
    }

    mkdirp(cfg.falkor.base, function () {
      var gypCall = child.execFile(gypScript, args, {cwd: cfg.falkor.base});

      gypCall.stdout.on('end', function () {
        async.series([
          buildProj.bind(null, 'bastian'),
          buildProj.bind(null, 'falkor'),
        ], done);
      });

      gypCall.stdout.pipe(devnull());
    });
  
  });
};