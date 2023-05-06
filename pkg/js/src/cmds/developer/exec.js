// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder } = require("discord.js");
const fx = require("../../fx.js");

module.exports = {
  config: {
    name: "syseval",
    category: "Developer",
    description: "e",
    usage: "e",
    aliases: [`seval`],
  },
  run: async (
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    /** @type {any} */ args,
    /** @type {any} */ config,
    bot_db
  ) => {
    if (args) {
      fx.exec_command_2(args.join(" "), function (error, stdout, stderr) {
        const embed = new EmbedBuilder()
          .setDescription("Execution for command: `" + args.join(" ") + "`")
          .addFields(
            {
              name: "stdout",
              value:
                "```" +
                (!stdout?.toString() ? "Unknown" : stdout.toString()) +
                "```",
              inline: true,
            },
            {
              name: "stderr",
              value:
                "```" +
                (!stderr?.toString() ? "Unknown" : stderr.toString()) +
                "```",
              inline: true,
            }
          )
          .setColor(config.colors.embed_gray);
        msg.channel.send({ embeds: [embed] });
      });
    }
  },
};
