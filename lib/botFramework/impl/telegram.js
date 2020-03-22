"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
const TelegramBotNative = require("node-telegram-bot-api");
const jsasserts_1 = __importDefault(require("jsasserts"));
const logger_1 = require("../logger");
class TelegramBot extends interfaces_1.Bot {
    constructor() {
        super();
        this.logger = logger_1.logger.getLogger("Telegram");
    }
    init(conf) {
        this.bot = new TelegramBotNative(conf.token, { polling: true });
        let asyncOnmessage = (msg) => __awaiter(this, void 0, void 0, function* () { return yield this.onMsg(yield this.mapInboundMessage(msg)); });
        this.bot.on('message', (msg) => asyncOnmessage(msg).then(() => { }).catch(e => this.processError(e)));
    }
    processError(processError) {
        this.logger.error("Error sending message", processError);
    }
    mapInboundMessage(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                text: msg.text,
                bot: this,
                from: msg.chat.id
            };
        });
    }
    send(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            jsasserts_1.default.assertNotEmpty(this.bot, "Bot should be initialized");
            jsasserts_1.default.assertNotEmpty(msg.text, "Text must present");
            yield this.sendImage(msg);
            let resultMessage = yield this.bot.sendMessage(msg.to, msg.text || "", { reply_markup: yield this.processKeyboard(msg) });
            return resultMessage;
        });
    }
    processKeyboard(msg) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let markupOpts = {
                inline_keyboard: [[]],
                keyboard: [[]]
            };
            if ((_a = msg.keyboard) === null || _a === void 0 ? void 0 : _a.length) {
                for (let k in msg.keyboard) {
                    markupOpts.keyboard[0].push({
                        text: msg.keyboard[k].text
                    });
                }
            }
            else {
                return {
                    remove_keyboard: true
                };
            }
            this.logger.info("Sending markup: ", markupOpts);
            return markupOpts;
        });
    }
    sendImage(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            jsasserts_1.default.assertNotEmpty(this.bot, "Bot should be initialized");
            if (this.bot && msg.image) {
                let params = {};
                let data;
                if (msg.image instanceof Buffer) {
                    data = msg.image;
                }
                else {
                    params = {
                        contentType: msg.image.contentType,
                        filename: msg.image.name
                    };
                    data = msg.image.data;
                }
                yield this.bot.sendPhoto(msg.to, data, params);
            }
        });
    }
}
exports.TelegramBot = TelegramBot;
//# sourceMappingURL=telegram.js.map