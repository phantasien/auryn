var child = require('child_process');
var config = require('../config');
var devnull = require('dev-null');
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
var gypScript = path.join(bastianPath, 'tools', 'gyp_bastian');
var gypFile = path.join(falkorPath, 'falkor.gyp');


ios.name = 'ios';
ios.label = 'iOS Library';
ios.dependencies = [python, iosSDK];


ios.validate = function (done) {
  config.getAll(function (err, cfg) {
    var message = 'ios lib was not found';
    var outPath = path.join(cfg.falkor.base, 'out', 'jsc-ios');

    fs.exists(outPath, function (exists) {
      if (!exists) return done({message: message});

      var result = shell.find(outPath).filter(function (file) {
        return file.match(/libfalkor.a$/);
      });
    
      done(result.length > 0 ? null : {message: message});
    });
  });
};



ios.install = function (done) {
  config.getAll(function (err, cfg) {

    var args = [
      '-Dbastian_project=' + cfg.falkor.base,
      '-Dbastian_engine=jsc',
      '-DOS=ios',
      gypFile
    ];

    mkdirp(cfg.falkor.base, function () {
      var gypCall = child.execFile(gypScript, args, {cwd: cfg.falkor.base});

      gypCall.stdout.on('end', function () {
        console.log('cwd =', path.join(cfg.falkor.base, 'out', 'jsc-ios'))
        var make = child.execFile('xcodebuild', ['-project', 'falkor.xcodeproj'], {cwd: path.join(cfg.falkor.base, 'out', 'jsc-ios')});
        
        make.stdout.on('end', done);
        make.stdout.pipe(devnull());
      });

      gypCall.stdout.pipe(devnull());
    });
  
  });
};