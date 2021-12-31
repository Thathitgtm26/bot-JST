var express = require('express');
var x3 = express.Router();

// load pre-trained model
const model = require('./sdk/model.js'); // predict

// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '5001348467:AAHIeGBZ9etH_j3eDhEADJ4ipFAfQYEytX0'
const bot = new TelegramBot(token, {polling: true});

state = 0;
// Main Menu Bot
bot.onText(/\/start/, (msg) => { 
    bot.sendMessage(
        msg.chat.id,
        `hello ${msg.chat.first_name}, welcome...\n
        click /predict`
    );   
    state = 0;
});

// input requires x1, x2, and x3
bot.onText(/\/predict/, (msg) => { 
    bot.sendMessage(
        msg.chat.id,
        `masukan nilai x1|x2|x3 contohnya 3|6|9`
    );   
    state = 1;
});

bot.on('message', (msg) => {
    if(state == 1){
        s = msg.text.split("|");
        x1 = s[0]
        x2 = s[1]
        x3 = s[2]
        model.predict(
            [ 
                parseFloat(s[0]), // string float
                parseFloat(s[1]),
                parseFloat(s[2])
            ]
        ).then((jres)=>{
            bot.sendmessage(
                msg.chat.id,
                `hasil nilai y1 adalah ${jres[0]}`
            );  
            bot.sendmessage(
                msg.chat.id,
                `hasil nilai y2 adalah ${jres[1]}`
            );
            bot.sendmessage(
                msg.chat.id,
                `hasil nilai y3 adalah ${jres[2]}`
            );
            state = 0;
        })
    }else{
        state = 0
    }
})


// routers
// use => ...../api/predict/10/20/30
x3.get('/predict/:x1/:x2/:x3', function(req, res, next) {    
    model1_7.predict(
        [
            parseFloat(req.params.x1), // string to float
            parseFloat(req.params.x2), // string to float
            parseFloat(req.params.x3)
        ]
    ).then((jres)=>{   
        res.json(jres); // to pc / arduino
    })
});
module.exports = x3;
