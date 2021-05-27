const { catalog, Invoice } = require('../models')

const startCommand = bot => {
    bot.start((ctx) => ctx.reply('👋  Welcome to the Demo Music Store! \n\nYou can view the /catalog or ask for /help'))
}

const helpCommand = bot => {
    bot.help((ctx) => ctx.reply('You can view the /catalog to select which album you would like to purchase. Then make a purchase with a test credit card (e.g. 5555 5555 5555 4444)'))
}

const hearsGreeting = bot => {
    bot.hears(/hi/i, (ctx) => {
        const { first_name: name } = ctx.from
        ctx.reply(`👋  Hello, ${name}! Would you like to view the /catalog?`)
    })
}

const catalogCommand = bot => {
    bot.command('catalog', ctx => {
        const options = catalog.albums.map(a => [{ text: a.title, callback_data: a.id }])
    
        ctx.reply('Select a music album 🎸', {
            reply_markup: {
                inline_keyboard: options
            }
        })
    })
}

const registerActionForEachAlbum = bot => {
    catalog.albums.forEach(album => bot.action(album.id, async ctx => {
        await ctx.replyWithPhoto(album.cover, {
            caption: `${album.title}`,
            reply_markup: {
                inline_keyboard: [[{ text: 'Purchase', callback_data: `purchase:${album.id}` }]]
            }
        })
    }))
}

const purchaseAction = bot => {
    bot.action(/(purchase):(.+)/ig, async ctx => {
        const albumId = ctx.match[2]
        const album = catalog.getAlbumById(albumId)

        const details = { 
            title: album.title, 
            description: `Click to purchase ${album.title}`, 
            photo_url: album.cover, 
            payload: album.id, 
            currency: 'SGD', 
            items: album.songs
         }

        const invoice = new Invoice(details).generateInvoice()

        await ctx.replyWithInvoice(invoice)
    })
}

const processPayment = bot => {
    bot.on("pre_checkout_query", (ctx) => {
        const isSuccessfulPayment = true
        const failedPaymentMessage = `😔  Sorry, your transaction failed to go through. Please try again later.`

        ctx.answerPreCheckoutQuery(isSuccessfulPayment, failedPaymentMessage)
    })
}

const onSuccessfulPayment = bot => {
    bot.on("successful_payment", async (ctx) => {
        const { first_name: name } = ctx.from
        const albumId = ctx.message.successful_payment.invoice_payload
        const album = catalog.getAlbumById(albumId)

        await ctx.replyWithPhoto(album.cover, { caption: `Thank you ${name} for your purchase. Enjoy the music! 🎸` })

        album.songs.forEach(s => ctx.replyWithAudio(s.url))
    })
}

module.exports = {
    hearsGreeting,
    startCommand,
    helpCommand,
    catalogCommand,
    registerActionForEachAlbum,
    purchaseAction,
    processPayment,
    onSuccessfulPayment,
}
