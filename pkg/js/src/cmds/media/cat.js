// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.
// @ts-nocheck
// @ts-ignore
const { EmbedBuilder } = require("discord.js");

// @ts-ignore
const fx_message = require("../../fx_Messages.js");
// @ts-ignore
const fx = require("../../fx.js");

module.exports = {
  config: {
    name: "cat",
    category: "Media",
    description: "Meow! Purr~~",
    usage: "No arguments accepted!",
    aliases: [`rndcat`, `randomcat`],
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
    // @ts-ignore
    // @ts-ignore
    msg.channel.send(fx_message.search_message()).then(async (m) => {
      m.edit(config.emojis.excited + " found a cat!!");
      const superagent = require("superagent");
      const { body } = await superagent.get("https://cataas.com/cat?json=true");
      const embed = fx
        .embed()
        .setTitle(
          fx.randomFromArr([
            "meow!",
            "purr~~",
            "a cat just landed!",
            "a furball just touched down",
            "awwww, adorable",
            "kitty cat? :3",
            "meow meow",
          ])
        )
        .setImage(`https://cataas.com/cat?${body.file}`);
      m.channel.send({ embeds: [embed] });
    });
  },
};
