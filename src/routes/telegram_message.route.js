const express = require('express');
const router = express.Router();
const telegramMessageController = require('../controllers/telegram_message.controller')

router.get('/send-message', telegramMessageController.sendTelegramMessage);

module.exports = router;