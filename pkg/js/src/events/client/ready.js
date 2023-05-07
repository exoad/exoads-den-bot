// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.
const botgen = require("../../fx_BotGeneric");

module.exports = async (
  /** @type {{ commands: { keys: () => import("querystring").ParsedUrlQueryInput | undefined; get: (arg0: any) => any; }; aliases: { get: (arg0: any) => any; }; }} */ bot,
  /** @type {{ author: { bot: any; id: string; }; channel: { type: string; }; content: { startsWith: (arg0: string) => any; slice: (arg0: string) => string; }; reply: (arg0: string) => void; }} */ msg
) => {
  console.log("[READY_EVENT_HANDLER] Online...");
  bot.user.setActivity("www.pixiv.net");
  botgen.l0g("I am online!", null, bot, msg, "Green");
};
