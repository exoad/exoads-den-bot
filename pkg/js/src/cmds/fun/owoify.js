// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder } = require("discord.js");
const superagent = require("superagent");
const fx = require("../../fx.js");

module.exports = {
  config: {
    name: "owoify",
    category: "Fun",
    description: "Make your message be OwOified",
    usage: "A sentence after the initial command like so: owoify [sentence]",
    aliases: [`uwuify`],
  },
  run: async (
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    /** @type {any} */ args,
    /** @type {any} */ config,
    bot_db
  ) => {
    // @ts-ignore
    if (!args[0]) return msg.channel.send("You didn't provide anything!");
    let phrase = args.join("%20");
    fx.exec_command("pwd", function (callback) {
      let script = callback.replace("\n", "") + "/pkg/lib/java/owo";
      console.log("cd " + script + " && java OwO " + phrase);
      fx.exec_command("cd " + script + " && java OwO " + phrase, function (er) {
        console.log(er);
        msg.channel.send(er == "" ? "?" : er);
      });
    });
  },
};
