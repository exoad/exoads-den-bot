// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

// @ts-ignore
const { EmbedBuilder } = require("discord.js");
const { Database } = require("secure-db");
// @ts-ignore
const fx_message = require("../../fx_Messages.js");
// @ts-ignore
const fx = require("../../fx.js");

module.exports = {
  config: {
    name: "dbinternal",
    category: "Developer",
    description: "?",
    usage: "?",
    aliases: [`dbi`],
  },
  run: async (
    // @ts-ignore
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    // @ts-ignore
    /** @type {any} */ args,
    // @ts-ignore
    /** @type {any} */ config,
    // @ts-ignore
    /** @type {any} */ bot_db
  ) => {
    if(args[0] == "add") {
      if(args[1] == "authusers") {
        bot_db.push("authorized_users", args[2]);
        // @ts-ignore
        msg.channel.send("ok! done.");
      }
    } else if (args[0] == "list") {
      if(args[1] == "authusers") {
        // @ts-ignore
        msg.channel.send("authusers -> " + bot_db.get("authorized_users").toString());
      }
    }
  },
};
