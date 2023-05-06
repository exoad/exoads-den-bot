// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "help",
    category: "Utility",
    description:
      "Find a problem based on selected attributes/arguments in the command.",
    usage:
      "A single argument is required.\nThis argument [ command ], the command you wish to find more information on.\nExample usage: " +
      require("../../../../config/bot.json").prefix +
      "search me",
    aliases: [`cmd`],
  },
  run: async (
    /** @type {{ commands: { get: (arg0: any) => any; }; }} */ bot,
    /** @type {{ channel: { send: (arg0: string) => void; }; }} */ msg,
    /** @type {string[]} */ args,
    /** @type {{ prefix: string; }} */ config
  ) => {
    let cmd = args[0];
    if (!cmd) {
      function getIndividualCategories() {
        let arr = bot.commands;
        let t = new Map();
        // @ts-ignore
        arr.forEach(
          (/** @type {{ config: { category: string; name: any; }; }} */ x) => {
            if (x.config.category != "Developer") {
              let old =
                (!t.get(x.config.category) ? "" : t.get(x.config.category)) +
                x.config.name +
                " ";
              t.set(x.config.category, old);
            }
          }
        );
        let ar = [];
        t.forEach((re, r) => {
          ar.push({
            name: "**" + r + "**",
            value: !re ? "" : "```\n" + re + "```",
            inline: true,
          });
        });
        return ar;
      }
      const embed = new EmbedBuilder()
        .setTitle("Detailed Command Pool")
        .setDescription(
          "Use this command like: `" +
            config.prefix +
            "help [command]` to get information specific for that command. You can also use `" +
            config.prefix +
            "cmdspew` to get a plain list of aliases and commands without detail. :D"
        )
        .addFields(getIndividualCategories());
      // @ts-ignore
      msg.channel.send({ embeds: [embed] });
    } else {
      let fcmd = bot.commands.get(cmd);
      if (!fcmd) {
        msg.channel.send(
          "**Oh??**\nYou wanted: `" +
            args[0] +
            "` but I could not find that in the commands pool.\nYou should consult the Command Spew Pool using: `" +
            config.prefix +
            "cmdspew` to get a list of avaliable commands!"
        );
      } else {
        const embed = new EmbedBuilder()
          .setTitle(fcmd.config.name)
          .addFields(
            {
              name: "Description",
              value: "```\n" + fcmd.config.description + "```",
            },
            {
              name: "Category",
              value: "`" + fcmd.config.category + "`",
            },
            {
              name: "Usage",
              value: "```\n" + fcmd.config.usage + "```",
            },
            {
              name: "Aliases",
              value: "```" + Array.from(fcmd.config.aliases).toString() + "```",
            }
          )
          .setTimestamp()
          .setColor("Random");

        // @ts-ignore
        msg.channel.send({ embeds: [embed] });
      }
    }
  },
};
