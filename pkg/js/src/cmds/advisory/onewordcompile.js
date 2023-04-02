// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const { Database } = require("secure-db");

module.exports = {
  config: {
    name: "onewordcompile",
    category: "Advisory",
    description: "Compiles the current one word prompts",
    usage: "No arguments accepted",
    aliases: [`owcompile`],
  },
  run: async (
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    /** @type {any} */ args,
    /** @type {any} */ config,
    bot_db
  ) => {
    async function fetchAllMessages() {
      let messages = [];
      let lastID;
      while (true) {
        // eslint-disable-line no-constant-condition
        const fetchedMessages = await bot.channels.cache
          .get("1091133699606724628")
          .messages.fetch({
            limit: 100,
            ...(lastID && { before: lastID }),
          });

        messages = messages.concat(Array.from(fetchedMessages.values()));
        lastID = fetchedMessages.lastKey();
      }
    }
    if (!bot_db.get("last_owcompile"))
      bot_db.set("last_owcompile", new Date().getTime());
    const timeLimit = 60 * 60 * 12 * 1000;
    if (timeLimit >= bot_db.get) {
      let real = await fetchAllMessages();
      if (real.length <= 1800)
        // @ts-ignore
        bot.channels.cache
          .get("1091133699606724628")
          .send(
            "**One word stories compilation**\n```" + real.join(" ") + "```"
          );
      else {
        const h = new AttachmentBuilder(Buffer.from(real.join(" "))).setName(
          "owcompile.txt"
        );
        // @ts-ignore
        bot.channels.get("1091133699606724628").send({ files: [h] });
      }
    } else {
      let real = await fetchAllMessages();

      if (real.length <= 1800)
        // @ts-ignore
        bot.channels.cache
          .get("1091133699606724628")
          .send(
            "**One word stories compilation**\n```" + real.join(" ") + "```"
          );
      else {
        const h = new AttachmentBuilder(Buffer.from(real.join(" "))).setName(
          "owcompile.txt"
        );
        // @ts-ignore
        bot.channels.get("1091133699606724628").send({ files: [h] });
      }
    }
    bot_db.set("last_owcompile", new Date().getTime());
  },
};
