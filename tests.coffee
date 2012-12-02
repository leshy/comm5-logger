logger = require './index.js'

exports.consoleLogger = (test) ->
    x = new logger.consoleLogger()
    x.log('hi, this is a test line',{ some: 'data' }, 'bla', 'main', 'level9')
    test.done()
    