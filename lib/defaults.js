var osenv = require('osenv');
var path = require('path');

var def = module.exports = {};
var thirdPartyDir = path.join(__dirname, '..', 'third_party');


def.android = {};
def.android.home = path.join(thirdPartyDir, 'android-sdk');
def.android.target = 'android-15';
def.android.templatedir = path.join(__dirname, 'templates', 'android');
def.android.libsdir = path.join(__dirname, '..', 'src', 'android', 'libs');
def.android.bin = {}
def.android.bin.android = path.join(thirdPartyDir, 'android-sdk', 'tools', 'android'); 

def.java = {};
def.java.home = path.join(thirdPartyDir, 'openjdk'); 

def.ant = {};
def.ant.bin = path.join(thirdPartyDir, 'ant', 'bin', 'ant');

def.project = {};
def.project.dockdir = './dock';
def.project.main = 'index.js';

def.xed = {};
def.xed.bin = path.join(require.resolve('xed'), '../bin/xed');

def.xcli = {};
def.xcli.bin = path.join(require.resolve('xcli'), '../bin/xcli');