# Music Store Chat Bot

Purchase and download songs directly on Telegram through the music store chat bot

### Usage

To try out this chat bot interact with [@MusicRecordsBot](https://t.me/MusicRecordsBot) on Telegram. Run the `/start` and `/help` commands to learn how to use the bot. 

This bot is for demonstration purposes only. Purchases can only be made with test credit cards. No real money will be charged.

You may use this credit card number `4242 4242 4242 4242` to make purchases or use any one of [these credit cards](https://stripe.com/docs/testing#cards). 

## Develop

Create a `.env` file with the following environment variables:

```sh
BOT_TOKEN="your-chat-bot-token"
PROVIDER_TOKEN="your-payment-provider-token"
```

You can get both of these tokens from [@BotFather](https://t.me/BotFather).

Be sure to use different bot tokens for development and production. Starting a bot locally will override any webhooks associated with that bot. I use [@YetAnotherDemoBot](https://t.me/YetAnotherDemoBot) strictly for local development only. 

Install dependencies

```sh
npm install
```

Run locally

```sh
npm start
```

## Set webhook 

```sh
curl -F "url=https://<INVOKE_URL>" https://api.telegram.org/bot<BOT_TOKEN>/setWebhook
```

Starting a bot locally will override the webhook.
