(function() {
  var color, comm, consoleLogger, logger;
  var __slice = Array.prototype.slice;
  comm = require('comm/serverside');
  color = require('color');
  exports.logger = logger = comm.MsgNode.extend4000({
    log: function() {
      var data, tags, text;
      text = arguments[0], data = arguments[1], tags = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      return this.msg({
        tags: tags,
        text: text,
        data: data,
        time: new Date().getTime()
      });
    }
  });
  exports.consoleLogger = consoleLogger = logger.extend4000({
    initialize: function() {
      return this.subscribe({
        tags: true
      }, function(msg, reply, next, transmit) {
        console.log(String(new Date(msg.time)).yellow + " " + msg.tags.join(', ').green + " " + msg.text + " " + JSON.stringify(msg.data));
        reply.end();
        next();
        return transmit();
      });
    }
  });
}).call(this);
