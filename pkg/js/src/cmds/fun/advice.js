// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder } = require("discord.js");
const request = require("node-superfetch");
module.exports = {
  config: {
    name: "advice",
    category: "Fun",
    description: "Gives advice",
    usage: "No arguments",
    aliases: [],
  },
  run: async (
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    /** @type {any} */ args,
    /** @type {any} */ config, bot_db
  ) => {
    const { text } = await request.get("http://api.adviceslip.com/advice");
    // @ts-ignore
    const body = JSON.parse(text);

    const embed = new EmbedBuilder()
      .setTitle(";D")
      .setDescription(`${body.slip.advice}`)
      .setColor("Random");

    msg.channel.send({ embeds: [embed] });
  },
};
