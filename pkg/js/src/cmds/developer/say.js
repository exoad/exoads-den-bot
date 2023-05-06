// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "say",
    category: "Developer",
    description: "",
    usage: "",
    aliases: [``],
  },
  run: async (
    // @ts-ignore
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    // @ts-ignore
    /** @type {any} */ args,
    // @ts-ignore
    /** @type {any} */ config, bot_db
  ) => {
    // @ts-ignore
    let rety = msg.content.split(" ").slice(1);
    // @ts-ignore
    msg.delete();
    // @ts-ignore
    msg.channel.send(rety.join(" ")).cleanContent;

  },
};
