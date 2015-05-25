var androidSDK = require('./android-sdk');
var child = require('child_process')
var config = require('../config');
var fs = require('fs');
var path = require('path');
var streamify = require('streamify');


var androidPlatform = module.exports = {};


androidPlatform.name = 'android-platform';
androidPlatform.label = 'Android Platform';
androidPlatform.dependencies = [androidSDK];


androidPlatform.validate = function (done) {
  config.getAll(function (err, cfg) {
    fs.exists(path.join(cfg.android.sdk, 'platforms', cfg.android.platform), function (exists) {
      if (!exists) return done({message: 'android platform ' + cfg.android.platform + ' is not installed'});

      done();
    });
  });
};

androidPlatform.install = function (done) {
  config.getAll(function (err, cfg) {
    var androidBin = path.join(cfg.android.sdk, 'tools', 'android');
    var targets = [
      cfg.android.platform,
      'tools',
      'platform-tools',
      'build-tools-22.0.1'
    ];
    var args = [
      'update',
      'sdk',
      '-u',
      '-t',
      targets.join(',')
    ];

    var c = child.execFile(androidBin, args, done);
    var bot = streamify();

    bot.on('pipe', function (source) {
      var answerTimerId = null;

      source.on('data', function (data) {
        clearInterval(answerTimerId);
        bot.emit('data', data);
        answerTimerId = setTimeout(function () {
          try {
            c.stdin.write('y\n');
          } catch(e) {
            // Just avoiding uncatched exception
            // No need to relate our bots issues
          }
        }, 2000);
      });
 
      source.on('end', function () {
        clearInterval(answerTimerId);
        bot.emit('end');
      });
    });

    c.stdout.pipe(bot);
  });
};