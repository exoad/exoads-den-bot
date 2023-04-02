// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "triggered",
    category: "Fun",
    description: "Overlay a triggered",
    usage: "1 argument: user<user_mention>",
    aliases: [],
  },
  run: async (
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    /** @type {any} */ args,
    /** @type {any} */ config, bot_db
  ) => {
    // @ts-ignore
    let avatar = msg.mentions.users.size
      ? // @ts-ignore
        msg.mentions.users.first().avatarURL({ format: "png", dynamic: false })
      : // @ts-ignore
        msg.author.avatarURL({ format: "png", dynamic: false });

    msg.channel.send({
      // @ts-ignore
      files: [
        {
          attachment: `https://some-random-api.ml/canvas/overlay/triggered?avatar=${avatar.replaceAll(
            ".webp",
            ".png"
          )}`,
          name: "pixel.gif",
        },
      ],
    });
  },
};
