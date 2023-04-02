const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "cmdspew",
    category: "Utility",
    description: "Spews all of the avaliable commands",
    usage: "No arguments accepted",
    aliases: [`commandspew`],
  },
  run: async (
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    /** @type {any} */ args,
    /** @type {any} */ config
  ) => {
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setDescription(
        "```" + Array.from(bot.commands.keys()).toString() + "```"
      )
      .setTimestamp()
      .setTitle(
        "Command Spew [" + Array.from(bot.commands.keys()).length + "]"
      );

    msg.channel.send({ embeds: [embed] });
  },
};
