comm = require 'comm/serverside'
color = require 'color'

# I only need console logger for now,
# this could easily be piped to a collection node for db logging for example
# roundrobin collection could easily be implemented by a collection subclass with automatic
# per log entry index numbering


exports.logger = logger = comm.MsgNode.extend4000
    log: (text,data,tags...) ->
        @msg({tags: tags, text: text, data: data, time: new Date().getTime()})



exports.consoleLogger = consoleLogger = logger.extend4000
    initialize: ->
        @subscribe { tags: true }, (msg,reply,next,transmit) ->
            console.log String(new Date(msg.time)).yellow + " " + msg.tags.join(', ').green + " " + msg.text + " " + JSON.stringify(msg.data)
            reply.end(); next(); transmit();
