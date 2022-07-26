//Firebase
require('../configs/firebase')
const firebase = require('firebase-admin');

async function sendPush(req, res) {
    const {
        title,
        body,
        token
    } = req.body
    const payload = {
        data: {
            title: title,
            body: body
        }
    }
    const options = {
        priority: "hight",
        timeToLive: 60*60*24,
        contentAvailable: true
    }
    if (!token) {
        return res.status(400).json({
            messsage: 'Token is not null'
        })
    }
    firebase.messaging().sendToDevice(token, payload, options)
        .then(rs => {
            return res.status(201).json({
                messsage: 'send push success'
            })
        })
        .catch(err => {
            return res.status(400).json({
                messsage: 'send push is miss'
            })
        })

}

async function sendPushSpecificDevice(req, res) {
    const {
        data,
        token
    } = req.body
    const message = {
        data: data,
        token: token
    }
    firebase.send(message).then(rs => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
        return res.status(201).json({
            message: 'send push success'
        })
    }).catch(err => {
        return res.status(400).json({
            message: 'send push is error'
        })
    })
}

async function sendPushMultipleDevice(req, res) {
    const {
        data,
        token_list
    } = req.body
    const message = {
        data: data,
        tokens: token_list
    }
    firebase.sendMulticast(message).then(rs => {
        console.log(rs.successCount + ' messages were sent successfully');
        return res.status(201).json({
            messsage: 'send push success'
        })
    }).catch(err => {
        return res.status(400).json({
            messsage: 'send push is miss'
        })
    })
}

async function sendPushToTopic(req, res) {
    const {
        topic,
        data
    } = req.body
    const message = {
        data: data,
        topic: topic
    }
    firebase.send(message).then(rs => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
        return res.status(201).json({
            messsage: 'send push success'
        })
    }).catch(err => {
        return res.status(400).json({
            messsage: 'send push is miss'
        })
    })
}

module.exports = {
    sendPush,
    sendPushSpecificDevice,
    sendPushMultipleDevice,
    sendPushToTopic
}