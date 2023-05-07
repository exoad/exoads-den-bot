// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder } = require("discord.js");
const fx_message = require("../../fx_Messages.js");

const superagent = require("superagent");

module.exports = {
  config: {
    name: "randomfact",
    category: "Fun",
    description: "Get a random fact",
    usage: "No arguments accepted!",
    aliases: [`fact`, `rndfact`],
  },
  run: async (
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    /** @type {any} */ args,
    /** @type {any} */ config,
    /** @type {any} */ bot_db
  ) => {
    // @ts-ignore
    msg.channel.send(fx_message.search_message()).then(async (m) => {
      const { body } = await superagent.get("https://nekos.life/api/v2/fact");
      const embed = new EmbedBuilder()
        .setColor(config.colors.embed_gray)
        .setDescription(body.fact);
      m.channel.send({ embeds: [embed] });
    });
  },
};
