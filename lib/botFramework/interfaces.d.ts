import { InboundMessage, OutboundMessage } from "./types";
import { Logger } from "log4js";
export interface BotConfig {
    token: string;
}
export declare abstract class Bot {
    messageListeners: Listener[];
    logger: Logger;
    constructor();
    abstract init(conf: BotConfig): void;
    addMessageListener(listener: Listener): void;
    protected onMsg(msg: InboundMessage): Promise<void>;
    abstract send(msg: OutboundMessage): Promise<any>;
}
export interface Listener {
    onMessage(message: InboundMessage): Promise<void>;
}
//# sourceMappingURL=interfaces.d.ts.map