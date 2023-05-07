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
    // @ts-ignore
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    // @ts-ignore
    /** @type {any} */ args,
    /** @type {any} */ config,
    // @ts-ignore
    bot_db
  ) => {
    // @ts-ignore
    msg.channel
      // @ts-ignore
      .send(config.emojis.writing_down + " searching through the bookshelves")
      // @ts-ignore
      .then(async (m) => {
        m.edit(config.emojis.happy_look + " found it!");
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
          m.channel.send({ embeds: [embed] });
        } else {
          const embed = new EmbedBuilder()
            .setTitle(`${body.title}`)
            .setDescription(`${body.explanation}`)
            .setImage(`${body.hdurl}`)
            .setColor(config.colors.embed_gray);
          m.channel.send({ embeds: [embed] });
        }
      });
  },
};
