var child = require('child_process')


var python = module.exports = {};


python.name = 'python';
python.label = 'Python ~= 2.7.x';


python.validate = function (done) {
  child.execFile('python', ['--version'], null, function (err, stdout, stderr) {
    if (err) return done({message : 'python command is unknown'});

    var versionMatch = stderr.toString().match(/.*(([0-9]+)\.([0-9]+)\.([0-9]+)).*/);

    if (!versionMatch) return done({message: 'python version unknown'});

    var versionMessage = 'Python ~= 2.7.x, got ' + versionMatch[1];

    if (Number(versionMatch[2]) !== 2) return done({message: versionMessage});
    if (Number(versionMatch[3]) !== 7) return done({message: versionMessage});

    done(null);
  });
};