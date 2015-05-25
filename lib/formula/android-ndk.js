var config = require('../config');
var fs = require('fs')
var os = require('os');
var osenv = require('osenv');
var mv = require('mv');
var path = require('path');
var Download = require('download');



var androidNDK = module.exports = {};
var sysName = os.type().toLowerCase();
var sysArch = os.arch() === 'x64' ? 'x86_64' : 'x86';

androidNDK.name = 'android-ndk';
androidNDK.label = 'Android NDK';


androidNDK.validate = function (done) {
  done({message: 'no rule for validation'});
};

androidNDK.install = function (done) {
  config.getAll(function (err, cfg) {
    var filename = 'android-ndk-' + cfg.android.ndkrelease + '-' + sysName + '-' + sysArch + '.bin';
    var tmpDir = path.join(osenv.tmpdir(), 'android-ndk');

    new Download({mode: '755', extract: true})
      .get('http://dl.google.com/android/ndk/' + filename)
      .dest(tmpDir)
      .run(function (err) {
        if (err) return done(err);
      });
  });  
};