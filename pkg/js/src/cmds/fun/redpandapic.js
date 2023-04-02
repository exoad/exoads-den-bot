// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const superagent = require("superagent");

module.exports = {
  config: {
    name: "redpanda",
    category: "Fun",
    description: "Get things about red pandas",
    usage:
      "You can supply the 'fact' to learn more about red pandas. Leave blank to get pics on red pandas",
    aliases: [`rpanda`, `red_panda`],
  },
  run: async (
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    /** @type {any} */ args,
    /** @type {any} */ config, bot_db
  ) => {
    let toChoose = args[0];
    const { body } = await superagent.get(
      "https://some-random-api.ml/animal/red_panda"
    );
    if (!toChoose) {
      const embed = new EmbedBuilder()
        .setTitle("Random Red Panda")
        .setImage(`${body.image}`)
        .setColor("Random");

      msg.channel.send({ embeds: [embed] });
    } else if (toChoose == "facts" || toChoose == "fact") {

      const embed = new EmbedBuilder()
        .setTitle("Random Red Panda Fact")
        .setDescription(`${body.fact}`)
        .setColor("Random");

      msg.channel.send({ embeds: [embed] });
    }
  },
};
