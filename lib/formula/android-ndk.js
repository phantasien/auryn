var child = require('child_process');
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
  config.getAll(function (err, cfg) {
    fs.exists(path.join(cfg.android.ndk, 'ndk-build'), function (exists) {
      if (!exists) return done({message: 'android ndk is not installed'});

      done();
    });
  });
};

androidNDK.install = function (done) {
  config.getAll(function (err, cfg) {
    var basename = 'android-ndk-' + cfg.android.ndkrelease;
    var filename = basename + '-' + sysName + '-' + sysArch + '.bin';
    var tmpDir = path.join(osenv.tmpdir(), 'android-ndk');

    new Download({mode: '755', extract: true})
      .get('http://dl.google.com/android/ndk/' + filename)
      .dest(tmpDir)
      .run(function (err) {
        if (err) return done(err);
        
        child.execFile(path.join(tmpDir, filename), {cwd: tmpDir}, function (err, stdout, stderr) {
          mv(
            path.join(tmpDir, basename),
            cfg.android.ndk,
            {mkdirp: true},
            done
          );
        });
      });
  });  
};