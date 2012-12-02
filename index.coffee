comm = require 'comm/serverside'
_ = require 'underscore'
color = require 'color'

# I only need console logger for now,
# this could easily be piped to a collection node for db logging for example
# roundrobin collection could easily be implemented by a collection subclass with automatic
# per log entry index numbering

exports.logger = logger = comm.MsgNode.extend4000
    log: (text,data,tags...) ->
        tagshash = {}
        _.map tags, (tag) -> tagshash[tag] = true
        @msg({tags: tagshash, text: text, data: data, time: new Date().getTime()})

exports.consoleLogger = consoleLogger = logger.extend4000
    initialize: ->
        @subscribe true, (msg,reply,next,transmit) ->
            text = msg.text
            if msg.tags.error then text = text.red
                
            console.log String(new Date(msg.time)).yellow + " " + _.keys(msg.tags).join(', ').green + " " + text + " " + JSON.stringify(msg.data)
            reply.end(); next(); transmit();
