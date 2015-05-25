var osenv = require('osenv');
var path = require('path');

var def = module.exports = {};
var thirdPartyDir = path.join(osenv.home(), '.auryn', 'third_party');


def.android = {};
def.android.home = path.join(thirdPartyDir, 'android-sdk');
def.android.target = 'android-15';

def.java = {};
def.java.home = path.join(thirdPartyDir, 'openjdk'); 

def.ant = {};
def.ant.bin = path.join(thirdPartyDir, 'ant', 'bin', 'ant');
