// Copyright 2023 Jack Meng. All rights reserved.
// Use of this source code is governed by a GPL-style
// license that can be found in the LICENSE file.

const { stringify } = require("querystring");
const { Database } = require("secure-db");
const config = require("../../../../config/bot.json");
const { getNotOks } = require("../../fx");
const talkedRecently_userIDS = new Set();
const botgen = require("../../fx_BotGeneric");
const fx = require("../../fx");
const h = require("../../../../../ipkg/config/h.json");
const illegalsTrackrecord = new Map();
const threshold = require("../../../../config/threshold.json");

module.exports = async (
  /** @type {{ commands: { keys: () => import("querystring").ParsedUrlQueryInput | undefined; get: (arg0: any) => any; }; aliases: { get: (arg0: any) => any; }; }} */ bot,
  /** @type {{ author: { bot: any; id: string; }; channel: { type: string; }; content: { startsWith: (arg0: string) => any; slice: (arg0: string) => string; }; reply: (arg0: string) => void; }} */ msg
) => {
  // @ts-ignore
  /*------------------------------------------------------------------------------ /
  / if (fx.getNotOks(msg.content).length > 0) {                                    /
  /   msg.delete();                                                                /
  /                                                                                /
  /   // @ts-ignore                                                                /
  /   illegalsTrackrecord.set(                                                     /
  /     msg.author.id,                                                             /
  /     !illegalsTrackrecord.has(msg.author.id)                                    /
  /       ? 1                                                                      /
  /       : illegalsTrackrecord.get(msg.author.id) + 1                             /
  /   );                                                                           /
  /   if (                                                                         /
  /     illegalsTrackrecord.has(msg.author.id) &&                                  /
  /     illegalsTrackrecord.get(msg.author.id) >= threshold.illegal_max            /
  /   ) {                                                                          /
  /     try {                                                                      /
  /       const guild = bot.guilds.cache.get("851999446057222144");                /
  /       const role = guild.roles.cache.get(config.roles.muted);                  /
  /       const member = await guild.members.fetch(msg.author.id);                 /
  /       member.roles.add(role);                                                  /
  /     } catch (err) {                                                            /
  /       if (err.code == 50013) {                                                 /
  /         botgen.l0g("Tried to mute a higherup, oops...", null, bot, msg, null); /
  /         return;                                                                /
  /       } else {                                                                 /
  /         console.error(err);                                                    /
  /       }                                                                        /
  /     }                                                                          /
  /   }                                                                            /
  /   botgen.l0g(                                                                  /
  /     "Unsafe operation performed by user: " +                                   /
  /       msg.author.id +                                                          /
  /       "\nwith literal: " +                                                     /
  /       msg.content +                                                            /
  /       "\nStock Left" +                                                         /
  /       illegalsTrackrecord.get(msg.author.id) +                                 /
  /       "/" +                                                                    /
  /       threshold.illegal_max,                                                   /
  /     null,                                                                      /
  /     bot,                                                                       /
  /     msg,                                                                       /
  /     "Red"                                                                      /
  /   );                                                                           /
  / }                                                                              /
  /-------------------------------------------------------------------------------*/
  if (config["ignore_BotCommands"] && msg.author.bot) {
    return;
  } else if (msg.channel.type === "dm") return;
  else if (
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
    let args_shift = args.shift();
    // @ts-ignore
    let old_cmd = args_shift;
    const cmd = args_shift.toLowerCase();
    let cmdFile =
      bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
    if (cmdFile) {
      if (old_cmd === cmd.toUpperCase()) {
        msg.channel.send(
          "**woah.**\nstop yelling at me and turn the `caps-lock` off"
        );
        return;
      }
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
          config.globalCmdTimeoutTime +
          "\ntotal: " +
          msg.content,
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
