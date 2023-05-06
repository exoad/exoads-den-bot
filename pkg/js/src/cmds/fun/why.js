// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder } = require("discord.js");
const superagent = require("superagent");

module.exports = {
  config: {
    name: "why",
    category: "Fun",
    description: "Why?",
    usage: "No arguments accepted",
    aliases: [``],
  },
  run: async (
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    /** @type {any} */ args,
    /** @type {any} */ config,
    bot_db
  ) => {
    const { body } = await superagent.get("https://nekos.life/api/v2/why");

    const embed = new EmbedBuilder()
      .setTitle("Why? Why? Why?")
      .setDescription(body.why)
      .setColor(config.colors.embed_gray);

    msg.channel.send({ embeds: [embed] });
  },
};
