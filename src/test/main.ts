require('source-map-support').install();
import {logger} from "../botFramework/logger"
import { TelegramBot } from "../botFramework/impl/telegram";
import Config from "./config"
import {Listener} from "../botFramework/interfaces"
import { InboundMessage } from "../botFramework/types";
import fs from "fs";

logger.configure('../../src/test/log4js.json');
let log = logger.getLogger("mainFile");
log.info("Starting application");
let bot = new TelegramBot();
bot.init({
    token: Config.telegramToken
});

class BotListener implements Listener{
    async onMessage(message: InboundMessage): Promise<void> {
        log.info("Message: {}", message);
        await message.bot.send({
            text: "Answer " + message.text,
            to: message.from,
            image: {
                data: fs.readFileSync("../../src/test/test.png"),
                name: "test"
            },
             keyboard: []
            //     {text: "hello"},
            //     {text: "world"}
            // ]
        });
    }
}


bot.addMessageListener(new BotListener());