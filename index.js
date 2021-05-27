const bot = require('./bot')

exports.handler = (event, context, callback) => {
    bot.handleUpdate(JSON.parse(event.body))

    return callback(null, {
        statusCode: 200,
        body: '',
    })
}
