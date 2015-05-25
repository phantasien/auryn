var child = require('child_process')


var ant = module.exports = {};


ant.name = 'ant';
ant.label = 'Apache Ant >= 1.9.0';


ant.validate = function (done) {
  child.execFile('ant', ['-version'], null, function (err, stdout, stderr) {
    if (err) return done({message : 'ant command is unknown'});

    var versionMatch = stdout.toString().match(/.* (([0-9]+)\.([0-9]+)\.([0-9]+)) .*/);

    if (!versionMatch) return done({message: 'ant version unknown'});

    var versionMessage = 'Need ant >= 1.9.0, got ' + versionMatch[1];

    if (Number(versionMatch[2]) < 1) return done({message: versionMessage});
    if (Number(versionMatch[3]) < 9) return done({message: versionMessage});

    done(null);
  });
};