const TeleBot = require('telebot');

async function sendTelegramMessage(req, res) {
    const {
        message,
        bot_token,
        chat_id
    } = req.body
    const bot = new TeleBot(bot_token)
    bot.sendMessage(chat_id, message).then(rs => {
        console.log('send telegram notification success: ', rs)
        return res.status(201).json({
            message: "send message success"
        })
    }).catch(err => {
        return res.status(400).json({
            message: 'send message is miss'
        })
    })
}

module.exports = {
    sendTelegramMessage
}