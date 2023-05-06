// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder } = require("discord.js");
const superagent = require("superagent");
module.exports = {
  config: {
    name: "nasa",
    category: "Informational",
    description: "NASA Daily",
    usage: "No Arguments!",
    aliases: [``],
  },
  run: async (
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    /** @type {any} */ args,
    /** @type {any} */ config,
    bot_db
  ) => {
    const { body } = await superagent.get(
      `https://api.nasa.gov/planetary/apod?api_key=${
        require("../../../../../ipkg/config/h.json").api_keys.nasa
      }`
    );

    if (body.hdurl == undefined) {
      const embed = new EmbedBuilder()
        .setTitle(`${body.title}`)
        .setDescription(`${body.explanation}`)
        .setColor(config.colors.embed_gray);

      msg.channel.send({ embeds: [embed] });
    } else {
      const embed = new EmbedBuilder()
        .setTitle(`${body.title}`)
        .setDescription(`${body.explanation}`)
        .setImage(`${body.hdurl}`)
        .setColor(config.colors.embed_gray);
      msg.channel.send({ embeds: [embed] });
    }
  },
};
