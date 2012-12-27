(function() {
  var color, comm, consoleLogger, logger, _;
  var __slice = Array.prototype.slice;
  comm = require('comm/serverside');
  _ = require('underscore');
  color = require('color');
  exports.logger = logger = comm.MsgNode.extend4000({
    log: function() {
      var data, tags, tagshash, text;
      text = arguments[0], data = arguments[1], tags = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      tagshash = {};
      _.map(tags, function(tag) {
        return tagshash[tag] = true;
      });
      return this.msg({
        tags: tagshash,
        text: text,
        data: data,
        time: new Date().getTime()
      });
    }
  });
  exports.consoleLogger = consoleLogger = logger.extend4000({
    initialize: function() {
      return this.subscribe(true, function(msg, reply, next, transmit) {
        var json, text;
        text = msg.text;
        if (msg.tags.error) {
          text = text.red;
        }
        if (msg.tags.error && _.keys(msg.data).length) {
          json = " " + JSON.stringify(msg.data);
        } else {
          json = "";
        }
        console.log(String(new Date(msg.time)).yellow + " " + _.keys(msg.tags).join(', ').green + " " + text + json);
        reply.end();
        next();
        return transmit();
      });
    }
  });
}).call(this);
