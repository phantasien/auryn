var fs = require('fs');
var xcode = require('./xcode');


var iosSDK = module.exports = {};


iosSDK.name = 'iosSDK';
iosSDK.label = 'iOS SDK';
iosSDK.dependencies = [xcode];


iosSDK.validate = function (done) {
  fs.exists('/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform', function (exists) {
    done(exists ? null : {message: 'could not find iPhoneOS.platform'});
  });
};