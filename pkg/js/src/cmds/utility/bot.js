// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder } = require("discord.js");
const sys = require("systeminformation");
const botgen = require("../../fx_BotGeneric");

module.exports = {
  config: {
    name: "bot",
    category: "Utility",
    description: "Get information on this bot",
    usage: "No arguments accepted",
    aliases: [`botinfo`],
  },
  run: async (
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    /** @type {any} */ args,
    /** @type {any} */ config,
    bot_db
  ) => {
    const embed = new EmbedBuilder()
      .setTitle("about me")
      .setDescription(
        "hi my name is " +
          config.name +
          ", i am here to help you with anything. here are some technical things about me..."
      )
      .addFields(
        {
          name: "Source",
          value: "https://github.com/exoad/exoads-den-bot",
          inline: true,
        },
        {
          name: "Maintainer",
          value: "exoad#9292",
          inline: true,
        },
        {
          name: "Service Hosting Information",
          value:
            "**OS** `" +
            (await sys.osInfo()).platform +
            ":" +
            (await sys.osInfo()).distro +
            "-" +
            (await sys.osInfo()).release +
            " | " +
            (await sys.osInfo()).kernel +
            " | " +
            (await sys.osInfo()).build +
            "`\n**Network** `" +
            (await sys.networkInterfaceDefault()) +
            "`\n**Host Timezone** `" +
            sys.time().timezoneName +
            "`",
          inline: false,
        },
        {
          name: "Frameworks",
          value: "NodeJS",
          inline: true,
        },
        {
          name: "Telemetry",
          value: "Interactions: " + botgen.interactions(),
          inline: true,
        }
      );
    msg.channel.send({ embeds: [embed] });
  },
};
