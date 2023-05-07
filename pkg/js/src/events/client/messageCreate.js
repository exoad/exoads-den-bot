// Copyright 2023 Jack Meng. All rights reserved.
// Use of this source code is governed by a GPL-style
// license that can be found in the LICENSE file.

const { stringify } = require("querystring");
const { Database } = require("secure-db");
const config = require("../../../../config/bot.json");
const { getNotOks } = require("../../fx");
const talkedRecently_userIDS = new Set();
const botgen = require("../../fx_BotGeneric");
const h = require("../../../../../ipkg/config/h.json");

module.exports = async (
  /** @type {{ commands: { keys: () => import("querystring").ParsedUrlQueryInput | undefined; get: (arg0: any) => any; }; aliases: { get: (arg0: any) => any; }; }} */ bot,
  /** @type {{ author: { bot: any; id: string; }; channel: { type: string; }; content: { startsWith: (arg0: string) => any; slice: (arg0: string) => string; }; reply: (arg0: string) => void; }} */ msg
) => {
  h.AUTO_REMOVE.forEach((x) => {
    // @ts-ignore
    if (msg.content.toLowerCase().includes(x)) {
      // @ts-ignore
      msg.delete();
    }
  });

  if (msg.author.bot || msg.channel.type === "dm") {
    return;
  } else if (
    config.use_globalCmdTimeout &&
    talkedRecently_userIDS.has(msg.author.id)
  ) {
    botgen.l0g(
      "Refused a connected for a ratelimit for author=" + msg.author.id,
      null,
      bot,
      msg
    );
    return;
  } else if (msg.content.startsWith(config.prefix)) {
    const bot_db = new Database("BOT_INTERNALS");
    // @ts-ignore
    // this fucking piece of code made me mald for 1 hour trying to find why the bot didnt react to messages and commands
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    // @ts-ignore
    const cmd = args.shift().toLowerCase();
    let cmdFile =
      bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
    if (cmdFile) {
      if (
        cmdFile.config.category == "Developer" &&
        msg.author.id != config["exoad-id"]
      )
        return;
      if (
        cmdFile.config.category == "Advisory" &&
        !bot_db.get("authorized_users").includes(msg.author.id)
      ) {
        return;
      }
      cmdFile.run(bot, msg, args, config, bot_db);
      botgen.l0g(
        "Running command: " +
          cmdFile.config.name +
          "\nauthor=" +
          msg.author.id +
          "\nbot_obj=" +
          bot.toString() +
          "\nUser timed out for: " +
          config.globalCmdTimeoutTime,
        null,
        bot,
        msg
      );

      botgen.interaction_increment();
      if (config.use_globalCmdTimeout && msg.author.id != config["exoad-id"]) {
        talkedRecently_userIDS.add(msg.author.id);
        setTimeout(
          () => talkedRecently_userIDS.delete(msg.author.id),
          config.globalCmdTimeoutTime
        );
      }
    }
  } else if (msg.author.id == "1") {
    // @ts-ignore
    msg.channel.send(
      ">>> message received: " +
        msg.content +
        "\nreceived as: " +
        // @ts-ignore
        getNotOks(msg.content).toString()
    );
  }
};
