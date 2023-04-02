// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder } = require("discord.js");
const https = require("https");
const fx = require("../../fx.js");
const url = [
  "https://www.reddit.com/r/memes/hot/.json?limit=100",
  "https://www.reddit.com/r/dankmemes/hot/.json?limit=100",
];
module.exports = {
  config: {
    name: "meme",
    category: "Fun",
    description: "Retrieves a meme from r/memes",
    usage: "None",
    aliases: [`memes`],
  },
  run: async (
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg
  ) => {
    https.get(fx.randomFromArr(url), (result) => {
      var body = "";
      result.on("data", (chunk) => {
        body += chunk;
      });

      result
        .on("end", () => {
          var response = JSON.parse(body);
          var index =
            response.data.children[Math.floor(Math.random() * 99) + 1].data;
          var subRedditName = index.subreddit_name_prefixed;
          var image = index.url;
          var title = index.title;
          if (index.post_hint !== "image") {
            var text = index.selftext;
            const textembed = new EmbedBuilder()
              .setTitle(subRedditName)
              .setColor(0xf0a856)
              .setDescription(`[${title}]\n\n${text}`)
              .setURL(`https://reddit.com/${subRedditName}`);
            msg.channel.send({ embeds: [textembed] });
          }

          if (index.post_hint !== "image") {
            const textembed = new EmbedBuilder()
              .setTitle(subRedditName)
              .setColor(0xf0a856)
              .setDescription(`[${title}]\n\n${text}`)
              .setURL(`https://reddit.com/${subRedditName}`);
            msg.channel.send({ embeds: [textembed] });
          }
          const imageembed = new EmbedBuilder()
            .setTitle(subRedditName)
            .setImage(image)
            .setColor(0xf0a856)
            .setDescription(`${title}`)
            .setURL(`https://reddit.com/${subRedditName}`);
          msg.channel.send({ embeds: [imageembed] });
        })
        .on("error", console.error);
    });
  },
};
