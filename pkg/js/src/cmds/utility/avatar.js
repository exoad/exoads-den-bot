// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder } = require("discord.js");
const fxBotGen = require("../../fx_BotGeneric.js");

module.exports = {
  config: {
    name: "avatar",
    category: "Utility",
    description: "Get the avatar of someone",
    usage: "1 arg(s) : [@user]",
    aliases: [],
  },
  run: async (
    /** @type {any} */ bot,
    /** @type {{ mentions: { users: { size: number; first: () => { (): any; new (): any; avatarURL: { (arg0: { format: string; dynamic: boolean; size: number; }): any; new (): any; }; username: any; }; }; }; author: { avatarURL: (arg0: { format: string; dynamic: boolean; }) => any; username: any; }; channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    /** @type {any} */ args,
    /** @type {any} */ config
  ) => {
    let avatar = msg.mentions.users.size
      ? msg.mentions.users
          .first()
          .avatarURL({ format: "png", dynamic: true, size: 1024 })
      : msg.author.avatarURL({
          format: "png",
          dynamic: true,
        });
    if (!avatar) {
      msg.channel.send(
        // @ts-ignore
        "Oh?? I couldn't find the avatar for that user! Maybe they don't have it set?"
      );
      fxBotGen.l0g(
        "Acquired an invalid avatar handle, possible reasons:\n?",
        null,
        bot,
        msg
      );
      return;
    }
    if (msg.mentions.users.size > 0) {
      const embed = new EmbedBuilder()
        .setColor(config.colors.embed_gray)
        .setTitle(
          `:white_check_mark: ${
            msg.mentions.users.first().username
          }\'s Profile Picture:`
        )
        .setImage(`${avatar}`);
      msg.channel.send({ embeds: [embed] });
    } else {
      const embed = new EmbedBuilder()
        .setColor(config.colors.embed_gray)
        .setTitle(
          `:white_check_mark: ${msg.author.username}\'s Profile Picture:`
        )
        .setImage(`${avatar}`);
      msg.channel.send({ embeds: [embed] });
    }
  },
};
