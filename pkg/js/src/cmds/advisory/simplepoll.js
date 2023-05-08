// @ts-nocheck
// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

// @ts-ignore
const { EmbedBuilder } = require("discord.js");

const fx_message = require("../../fx_Messages.js");
const fx = require("../../fx.js");

module.exports = {
  config: {
    name: "simplepoll",
    category: "Advisory",
    description: "Creates a poll",
    usage: "",
    aliases: [``],
  },
  run: async (
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    /** @type {any} */ args,
    /** @type {any} */ config,
    /** @type {any} */ bot_db
  ) => {
    if (!args || args[0] == "help") {
      // @ts-ignore
      msg.channel.send(
        // @ts-ignore
        'poll format incase you forgot: ```json\n{"title":"","description":"","emojis":[{"":""}],"image":""}\n```'
      );
      return;
    }
    try {
      let channel = args[0];

      let json = JSON.parse(msg.content.slice("simplepoll".length + channel.length + 2));
      const embed = fx
        .embed()
        .setTitle(json.title)
        .setAuthor({ name: msg.author.username })
        .setDescription(json.description)
        .setFooter({ text: "react below!" });
      if (json.image) embed.setImage(json.image);
      let fieldStr = "";
      json.emojis.forEach((emoji) => {
        for (const key in emoji) {
          fieldStr += `${key} -> ${emoji[key]}\n`;
        }
      });
      embed.addFields({
        name: "Legend",
        value: fieldStr,
        inline: true,
      });
      bot.channels.cache
        .get(channel)
        .send({ embeds: [embed] })
        .then((bm) => {
          json.emojis.forEach((emoji) => {
            for (const key in emoji) {
              bm.react(key);
            }
          });
        });
    } catch (err) {
      console.error(err);
    }
  },
};
