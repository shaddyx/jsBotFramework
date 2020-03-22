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
require('source-map-support').install();
const logger_1 = require("../botFramework/logger");
const telegram_1 = require("../botFramework/impl/telegram");
const config_1 = __importDefault(require("./config"));
const fs_1 = __importDefault(require("fs"));
logger_1.logger.configure('../../src/test/log4js.json');
let log = logger_1.logger.getLogger("mainFile");
log.info("Starting application");
let bot = new telegram_1.TelegramBot();
bot.init({
    token: config_1.default.telegramToken
});
class BotListener {
    onMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            log.info("Message: {}", message);
            yield message.bot.send({
                text: "Answer " + message.text,
                to: message.from,
                image: {
                    data: fs_1.default.readFileSync("../../src/test/test.png"),
                    name: "test"
                },
                keyboard: []
                //     {text: "hello"},
                //     {text: "world"}
                // ]
            });
        });
    }
}
bot.addMessageListener(new BotListener());
//# sourceMappingURL=main.js.map