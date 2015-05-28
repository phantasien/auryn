var fs = require('fs')


var iphoneos = module.exports = {};


iphoneos.name = 'iphoneos';
iphoneos.label = 'iPhone OS SDK';


iphoneos.validate = function (done) {
  fs.exists('/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform', function (exists) {
    done(exists ? null : {message: 'could not find iPhoneOS.platform'});
  });
};