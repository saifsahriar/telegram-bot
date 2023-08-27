
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

var tel_api = process.env['TELEGRAM_API']
const bot = new TelegramBot(tel_api, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;
    console.log(msg);

    var setup = "";
    var punchline = "";
    const url = 'https://dad-jokes.p.rapidapi.com/random/joke';

    if (messageText === '/start') {
        await bot.sendMessage(chatId, "/joke to get a joke");
        await bot.sendMessage(chatId, "/help to get a help");
        await bot.sendMessage(chatId, "/end to get end conversation");
    }

    else if (messageText === '/joke') {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '97eaa9e036msh5a4c7406dbab6e5p17c704jsnaef5f861fdcc',
                'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
            },
        };
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            setup= result.body[0].setup 
            punchline= result.body[0].punchline

            
            await bot.sendMessage(chatId, setup);
            await bot.sendMessage(chatId, punchline);
        } catch (error) {
            console.error(error);
        }
    }

    else if(messageText === "/help"){
        await bot.sendMessage(chatId, "sorry, help cannot be provided yet");
    }

    else if(messageText === "/end"){
        await bot.sendMessage(chatId, "its hard to see you go, btw... have a nice day");
    }

    else{
        await bot.sendMessage(chatId, "sorry cannot listen to your query, please input the commands only");
        await bot.sendMessage(chatId, "Optimised developement in process");

    }

});
  
