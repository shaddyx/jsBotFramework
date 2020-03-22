import {InboundMessage, OutboundMessage} from "./types"
import { logger } from "./logger";
import { Logger } from "log4js";

export interface BotConfig{
    token: string
}

export abstract class Bot{
    messageListeners: Listener[] = [];
    logger: Logger;
    constructor(){
        this.logger = logger.getLogger("Bot");
    }
    abstract init(conf: BotConfig): void;
    addMessageListener(listener: Listener): void {
        this.messageListeners.push(listener);
        this.logger.info("added listener")
    }
    protected async onMsg(msg: InboundMessage): Promise<void> {
        for (let k in this.messageListeners){
            await this.messageListeners[k].onMessage(msg);
        }
    }
    
    abstract send(msg: OutboundMessage): Promise<any>;
}

export interface Listener {
    onMessage(message: InboundMessage): Promise<void>
}