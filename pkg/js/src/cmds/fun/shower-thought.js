// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder } = require("discord.js");
const request = require("node-superfetch");
module.exports = {
  config: {
    name: "sthought",
    category: "Fun",
    description: "Return a random shower thought (from Reddit ofc)",
    usage: "No argument accepted",
    aliases: [`showerthought`],
  },
  run: async (
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    /** @type {any} */ args,
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    /** @type {any} */ config
  ) => {
    // @ts-ignore
    msg.channel
      // @ts-ignore
      .send("<a:writing_down:1104509994503774248> ok! fetching it now...")
      // @ts-ignore
      .then(async (m) => {
        m.delete();
        const { body } = await request
          .get("https://www.reddit.com/r/showerthoughts.json?sort=top&t=week")
          .query({
            // @ts-ignore
            limit: 800,
          });
        // @ts-ignore
        const allowed = msg.channel.nsfw
          ? // @ts-ignore
            body.data.children
          : // @ts-ignore
            body.data.children.filter((post) => !post.data.over_18);
        if (!allowed.length)
          m.channel.send(
            // @ts-ignore
            "<:dumb:1104512469642256544> **Oops**, the post I tried to fetch was marked as NSFW. Please try again! Sorry."
          );
        const randomnumber = Math.floor(Math.random() * allowed.length);
        const embed = new EmbedBuilder()
          .setColor(config.colors.embed_gray)
          .setTitle(allowed[randomnumber].data.title)
          .setDescription("Posted by: u/" + allowed[randomnumber].data.author)
          .setImage(allowed[randomnumber].data.url)
          .setTimestamp();
        m.channel.send({ embeds: [embed] });
      });
  },
};
