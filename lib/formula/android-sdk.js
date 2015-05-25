var config = require('../config');
var fs = require('fs');
var os = require('os');
var osenv = require('osenv');
var mv = require('mv');
var path = require('path');
var Download = require('download');


var androidSDK = module.exports = {};
var sysName = os.type().toLowerCase().replace('darwin', 'macosx');
var archType = sysName === 'linux' ? '.tgz' : '.zip';

androidSDK.name = 'android-sdk';
androidSDK.label = 'Android SDK';


androidSDK.validate = function (done) {
  config.getAll(function (err, cfg) {
    fs.exists(path.join(cfg.android.sdk, 'tools', 'android'), function (exists) {
      if (!exists) return done({message: 'android sdk is not installed'});

      done();
    });
  });
};

androidSDK.install = function (done) {
  config.getAll(function (err, cfg) {
    var filename = 'android-sdk_' + cfg.android.version + '-' + sysName + archType;
    var tmpDir = path.join(osenv.tmpdir(), 'android-sdk');

    new Download({mode: '755', extract: true})
      .get('http://dl.google.com/android/' + filename)
      .dest(tmpDir)
      .run(function (err) {
        if (err) return done(err);

        mv(
          path.join(tmpDir, 'android-sdk-' + sysName),
          cfg.android.sdk,
          {mkdirp: true},
          done
        );
      });
  });
};