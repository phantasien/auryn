var _ = require('lodash');
var async = require('async');


var setup = module.exports = {};


function listDependenciesInContext(ctx, formula, done) {
  var subcall = _.partial(listDependenciesInContext, ctx);

  async.eachSeries(formula.dependencies || [], subcall, function () {
    formula.validate(function (err) {
      if (!!err) {
        var stack = 'install' in formula ? ctx.fixables : ctx.fatals;

        ctx.errors.push(err);
        if (!_.contains(stack, formula)) stack.push(formula);
      }

      done();
    });
  });
};

setup.listDependencies = function (formula, done) {
  var ctx = {fatals: [], fixables: [], errors: []};

  formula = _.isString(formula) ? setup.formula(formula) : formula;

  listDependenciesInContext(ctx, formula, function () {
    done(ctx.fatals, ctx.fixables);
  });
};

setup.formula = function (name) {
  var formula;

  try {
    formula = require('./formula/' + name);
  } catch(err) {
    formula = null;
  }

  return formula;
};