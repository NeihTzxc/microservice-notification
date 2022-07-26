const express = require('express');
const bodyParse = require('body-parser');
const app = express();
const port = process.env.port || 3000;
const PushRouter = require('./src/routes/push.route')
const TelegramMessage = require('./src/routes/telegram_message.route')
app.use(bodyParse.json());
app.use(
    bodyParse.urlencoded({
      extended: true,
    })
  );

app.get('/', (req, res) => {
    res.send("OK")
})


app.use('/push', PushRouter)

app.use('/telegram', TelegramMessage)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.messsage, err.stack);
    res.status(statusCode).json({
        messsage: err.messsage
    });
    return;
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
