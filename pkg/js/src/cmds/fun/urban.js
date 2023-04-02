// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder } = require("discord.js");
// @ts-ignore
const urban = require("urban");
module.exports = {
  config: {
    name: "urban",
    category: "Fun",
    description: "Urban Dictionary search a word",
    usage: "Provide a viable word as the first argument",
    aliases: [],
  },
  run: async (
    // @ts-ignore
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    /** @type {any} */ args,
    // @ts-ignore
    /** @type {any} */ config
  ) => {
    let word = args.join(" ");
    if (!word) return;
    urban(word).first((json) => {
      if (!json) {
        // @ts-ignore
        msg.channel.send("Found nothing.");
      }
      const embed = new EmbedBuilder()
        .setTitle("Word: " + json.word)
        .setDescription(
          `**Definition:** \`\`\`${json.definition}\`\`\` \n**Example:** \`\`\`${json.example}\`\`\``
        )
        .setColor("#16a5b8")
        .addFields(
          {
            name: ":small_red_triangle: Upvotes",
            value: json.thumbs_up,
          },
          {
            name: ":small_red_triangle_down: Downvotes",
            value: json.thumbs_down,
          },
          { name: "Author", value: "json.author" },
          {
            name: ":link: Link",
            value:
              "[Click Here](https://www.urbandictionary.com/define.php?term=" +
              args.join("%20") +
              ")",
          }
        )
        .setTimestamp(new Date());
      msg.channel.send({ embeds: [embed] });
    });
  },
};
