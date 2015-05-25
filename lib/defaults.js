var osenv = require('osenv');
var path = require('path');

var def = module.exports = {};
var thirdPartyDir = path.join(osenv.home(), '.auryn', 'third_party');


def.android = {};
def.android.sdk = path.join(thirdPartyDir, 'android-sdk');
def.android.platform = 'android-15';
def.android.version = 'r23.0.2';
def.android.ndk = path.join(thirdPartyDir, 'android-ndk');
def.android.ndkrelease = 'r10e';
