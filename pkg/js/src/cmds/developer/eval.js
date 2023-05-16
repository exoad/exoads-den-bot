// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "deval",
    category: "Developer",
    description: "None",
    usage: "None",
    aliases: [],
  },
  run: async (
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    /** @type {any} */ args,
    /** @type {any} */ config,
    bot_db
  ) => {
    try {
      var code = args.join(" ");
      if (code === "bot.token") return;
      var evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      const embed = new EmbedBuilder()
        .setColor(config.colors.embed_gray)
        .addFields({
          name: ":inbox_tray: Through: ",
          value: `\`\`\`js\n${code}\`\`\``,
        })
        .addFields({
          name: ":outbox_tray: Throughout: ",
          value: `\`\`\`js\n${clean(evaled)}\n\`\`\``,
        });
      msg.channel.send({ embeds: [embed] });
    } catch (err) {
      const embed = new EmbedBuilder()
        .setColor(config.colors.embed_gray)
        .addFields({ name: ":inbox_tray: In: ", value: `\`\`\`${code}\`\`\`` })
        .addFields({
          name: ":outbox_tray: Out: ",
          value: `\`\`\`js\n${clean(err)}\`\`\``,
        });
      msg.channel.send({ embeds: [embed] });
    }


    function clean(text) {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }
  },
};
