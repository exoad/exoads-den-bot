// Copyright 2023 Jack Meng. All rights reserved.
// Use of this source code is governed by a GPL-style
// license that can be found in the LICENSE file.

const { stringify } = require("querystring");
const config = require("../../../../config/bot.json");
const talkedRecently_userIDS = new Set();

module.exports = async (
  /** @type {{ commands: { keys: () => import("querystring").ParsedUrlQueryInput | undefined; get: (arg0: any) => any; }; aliases: { get: (arg0: any) => any; }; }} */ bot,
  /** @type {{ author: { bot: any; id: string; }; channel: { type: string; }; content: { startsWith: (arg0: string) => any; slice: (arg0: string) => string; }; reply: (arg0: string) => void; }} */ msg
) => {
  if (
    msg.author.bot ||
    msg.channel.type === "dm" ||
    !msg.content.startsWith(config.prefix)
  )
    return;
  else if (
    config.use_globalCmdTimeout &&
    talkedRecently_userIDS.has(msg.author.id)
  )
    return;
  else {
    // @ts-ignore
    // this fucking piece of code made me mald for 1 hour trying to find why the bot didnt react to messages and commands
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    // @ts-ignore
    const cmd = args.shift().toLowerCase();
    let cmdFile =
      bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
    if (cmdFile) {
      cmdFile.run(bot, msg, args, config);
      if (config.use_globalCmdTimeout && msg.author.id != config["exoad-id"]) {
        talkedRecently_userIDS.add(msg.author.id);
        setTimeout(
          () => talkedRecently_userIDS.delete(msg.author.id),
          config.globalCmdTimeoutTime
        );
      }
    }
  }
};
