import { Bot } from "./interfaces";

export interface InboundMessage{
    from: string | number;
    text: string | undefined;
    bot: Bot;
}
export interface OutboundMessage{
    text?: string | undefined;
    to: string | number;
    image?: Buffer | OutboundFile;
    keyboard?: Button[];
    markdownMode?: string;
}

export interface OutboundFile{
    data: Buffer,
    name: String,
    contentType?: string
}

export interface Button{
    text: string;
}