const express = require('express');
const router = express.Router();
const pushController = require('../controllers/push.controller')

router.post('/send-push', pushController.sendPush)
router.post('/send-push-specific-device', pushController.sendPushSpecificDevice)
router.post('/send-push-multiple-device', pushController.sendPushMultipleDevice)
router.post('/send-push-to-topic', pushController.sendPushToTopic)

module.exports = router;