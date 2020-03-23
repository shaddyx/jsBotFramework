import { Listener } from "../interfaces";
import { Bot, BotConfig } from "../interfaces";
import TelegramBotNative = require("node-telegram-bot-api");
import { InboundMessage, OutboundMessage } from "../types";
import Asserts from "jsasserts";
import {logger} from "../logger"


export class TelegramBot extends Bot{
    bot: TelegramBotNative | undefined;
    
    constructor(){
        super();
        this.logger = logger.getLogger("Telegram");
    }

    init(conf: BotConfig): void {
        this.bot = new TelegramBotNative(conf.token, {polling: true});
        let asyncOnmessage = async (msg: TelegramBotNative.Message) => await this.onMsg( await this.mapInboundMessage(msg));
        this.bot.on('message', (msg) => asyncOnmessage(msg).then(() => {}).catch(e => this.processError(e)));
    }
    processError(processError: any): void {
        this.logger.error("Error sending message", processError);
    }
    async mapInboundMessage(msg: TelegramBotNative.Message): Promise<InboundMessage> {
        return {
            text: msg.text,
            bot: this,
            from: msg.chat.id
        }
    }
    async send(msg: OutboundMessage): Promise<any> {
        
        Asserts.assertNotEmpty(this.bot, "Bot should be initialized");
        Asserts.assertNotEmpty(msg.text, "Text must present");
        await this.sendImage(msg);
        let resultMessage = await this.bot!.sendMessage(msg.to, msg.text || "", {
            reply_markup: await this.processKeyboard(msg),
            parse_mode: <TelegramBotNative.ParseMode> msg.markdownMode || undefined
        });
        return resultMessage;
    }
    
    async processKeyboard(msg: OutboundMessage){
        let markupOpts: any = {
            inline_keyboard: [[]],
            keyboard: [[]]
        };
        if (msg.keyboard?.length){
            for (let k in msg.keyboard){
                markupOpts.keyboard[0].push({
                    text: msg.keyboard[k].text
                });
            }
        } else {
            return {
                remove_keyboard: true
            }
        }
        this.logger.info("Sending markup: ", markupOpts);
        return markupOpts;
    }

    private async sendImage(msg: OutboundMessage) {
        Asserts.assertNotEmpty(this.bot, "Bot should be initialized");
        if (this.bot && msg.image) {
            let params = {};
            let data: Buffer;
            if (msg.image instanceof Buffer) {
                data = msg.image;
            }  else {
                params = {
                    contentType: msg.image.contentType,
                    filename: msg.image.name
                };
                data = msg.image.data;
            }
            await this.bot.sendPhoto(msg.to, data, params);
        }
    }
}