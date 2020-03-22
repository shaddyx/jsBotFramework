import { Bot, BotConfig } from "../interfaces";
import TelegramBotNative = require("node-telegram-bot-api");
import { InboundMessage, OutboundMessage } from "../types";
export declare class TelegramBot extends Bot {
    bot: TelegramBotNative | undefined;
    constructor();
    init(conf: BotConfig): void;
    processError(processError: any): void;
    mapInboundMessage(msg: TelegramBotNative.Message): Promise<InboundMessage>;
    send(msg: OutboundMessage): Promise<any>;
    processKeyboard(msg: OutboundMessage): Promise<any>;
    private sendImage;
}
//# sourceMappingURL=telegram.d.ts.map