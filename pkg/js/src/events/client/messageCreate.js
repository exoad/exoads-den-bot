// Copyright 2023 Jack Meng. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

const config = require("../../../../config/bot.json");
const talkedRecently_userIDS = new Set();

module.exports = async (bot, msg) => {
  if (
    msg.author.bot ||
    msg.channel.type === "dm" ||
    !msg.content.startsWith(config.prefix)
  )
    return;
  if (config.use_globalCmdTimeout && talkedRecently_userIDS.has(msg.author.id))
    return;
  else {
    const args = msg.content.slice(config.prefix).trim().split(/ +/g);
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
