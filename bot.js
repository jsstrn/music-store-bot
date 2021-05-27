const { Telegraf } = require('telegraf')
const { hearsGreeting, startCommand, helpCommand, processPayment, onSuccessfulPayment, purchaseAction, catalogCommand, registerActionForEachAlbum } = require('./commands')

const token = process.env.BOT_TOKEN

if (!token) {
    throw new Error('[ERROR] No bot token provided')
}

const bot = new Telegraf(token)

hearsGreeting(bot)

startCommand(bot)
helpCommand(bot)

catalogCommand(bot)

purchaseAction(bot)
registerActionForEachAlbum(bot)

processPayment(bot)
onSuccessfulPayment(bot)

module.exports = bot
