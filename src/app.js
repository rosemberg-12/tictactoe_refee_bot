const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
    console.log("Referee bot started");
    // Matches "/echo [whatever]"
    bot.onText(/\/echo (.+)/, (msg, match) => {

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});


// Matches "/echo [whatever]"
bot.onText(/\/preguntar (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    const params= resp.split(',');
    if(params.length<3 || params.length>11){
        bot.sendMessage(chatId, 'Invalid command');
    }
    const question=params[0];
    params.shift();
    const newPollParams= params.filter(item=>item!=='').map(item=>item.trim());
    bot.sendPoll(chatId, question , newPollParams)
        .catch(err => bot.sendMessage(chatId, 'Something Wrong happend'+err.message));
});

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//     // send a message to the chat acknowledging receipt of their message
//     bot.sendMessage(chatId, 'Received your message');
// });
