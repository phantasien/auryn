var child = require('child_process')


var xcode = module.exports = {};


xcode.name = 'xcode';
xcode.label = 'XCode >= 5.0.0';


xcode.validate = function (done) {
  child.execFile('xcodebuild', ['-version'], null, function (err, stdout, stderr) {
    if (err) return done({message : 'xcodebuild command is unknown'});

    var versionMatch = stdout.toString().match(/.*(([0-9]+)\.([0-9]+)\.([0-9]+)).*/);

    if (!versionMatch) return done({message: 'XCode version unknown'});

    var versionMessage = 'Need Xcode >= 5.0.0, got ' + versionMatch[1];

    if (Number(versionMatch[2]) < 5) return done({message: versionMessage});

    done(null);
  });
};