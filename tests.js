(function() {
  var logger;
  logger = require('./index.js');
  exports.consoleLogger = function(test) {
    var x;
    x = new logger.consoleLogger();
    x.log('hi, this is a test line', {
      some: 'data'
    }, 'bla', 'main', 'level9');
    return test.done();
  };
}).call(this);
