// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const superagent = require("superagent");

module.exports = {
  config: {
    name: "cats",
    category: "Fun",
    description: "Get things about cats",
    usage:
      "You can supply the 'fact' to learn more about cats. Leave blank to get pics on cats",
    aliases: [`cat`],
  },
  run: async (
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    /** @type {any} */ args,
    /** @type {any} */ config, bot_db
  ) => {
    let toChoose = args[0];
    const { body } = await superagent.get(
      "https://some-random-api.ml/animal/cat"
    );
    if (!toChoose) {
      const embed = new EmbedBuilder()
        .setTitle("Random Cat")
        .setImage(`${body.image}`)
        .setColor("Random");

      msg.channel.send({ embeds: [embed] });
    } else if (toChoose == "facts" || toChoose == "fact") {

      const embed = new EmbedBuilder()
        .setTitle("Random Cat Fact")
        .setDescription(`${body.fact}`)
        .setColor("Random");

      msg.channel.send({ embeds: [embed] });
    }
  },
};
