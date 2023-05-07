// @ts-nocheck
// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder, Embed } = require("discord.js");
const superagent = require("superagent");
const dbnames = require("../../../../config/db-names.json");
const { Database } = require("secure-db");
const fxBotGen = require("../../fx_BotGeneric.js");
const internal_cache = new Database(
  require("../../../../config/db-names.json")["internalcache"]
);
const moment = require("moment");
module.exports = {
  config: {
    name: "nasa",
    category: "Informational",
    description: "NASA Daily",
    usage:
      'Optional argument of "get [YYYY_MM_DD]" to get a cached version of a previous day\'s APOD.',
    aliases: [`nasaapod`],
  },
  run: async (
    // @ts-ignore
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    // @ts-ignore
    /** @type {any} */ args,
    /** @type {any} */ config,
    // @ts-ignore
    bot_db
  ) => {
    // @ts-ignore
    msg.channel
      // @ts-ignore
      .send(config.emojis.writing_down + " searching through the bookshelves")
      // @ts-ignore
      .then(async (m) => {
        if (!internal_cache.has("nasa_apod_cache")) {
          internal_cache.set("nasa_apod_cache", []);
          fxBotGen.l0g(
            "NASA Cached APOD was deleted?\nRecreated the cache pool.",
            null,
            bot,
            msg
          );
        }
        if (args[0] == "get") {
          if (!args[1]) {
            m.edit(
              config.emojis.oh_no +
                " **you need to provide a proper date format...**\nhere try these options:\n> 1. you this command without an argument\n> 2. provide a proper date timestamp in the format of `YYYY_MM_DD`"
            );
            fxBotGen.l0g(
              "Incorrect argument placed for command nasa\nUser: " +
                msg.author.id,
              null,
              bot,
              msg
            );
            return;
          } else {
            if (!internal_cache.get("nasa_apod_cache").includes(args[1])) {
              m.edit(
                config.emojis.dumb_look +
                  " **i couldn't find anything for the date:** `" +
                  args[1] +
                  "`\n> *maybe i never wrote it down?*"
              );
              fxBotGen.l0g(
                "Argument parsed for the wrong date in the NASA_APOD_CACHE pool.\nDate: " +
                  args[1],
                null,
                bot,
                msg
              );
              return;
            } else {
              m.edit(config.emojis.happy_look + " found it!");
              try {
                let { body } = JSON.parse(
                  internal_cache.get("nasa_apod_cache").get(args[1])
                );
                fxBotGen.l0g(
                  "Retrieve a specific cache for NASA_APOD from NASA_APOD_CACHE_POOL.",
                  null,
                  bot,
                  msg
                );
                if (body.hdurl == undefined) {
                  const embed = new EmbedBuilder()
                    .setTitle(`${body.title}`)
                    .setDescription(`${body.explanation}`)
                    .setColor(config.colors.embed_gray);
                  m.channel.send({ embeds: [embed] });
                } else {
                  const embed = new EmbedBuilder()
                    .setTitle(`${body.title}`)
                    .setDescription(`${body.explanation}`)
                    .setImage(`${body.hdurl}`)
                    .setColor(config.colors.embed_gray);
                  m.channel.send({ embeds: [embed] });
                }
              } catch (err) {
                if (err) {
                  m.edit(
                    config.emojis.dumb_look +
                      " **something went wrong...**\n> *you should start spam pinging exoad*"
                  );
                  console.error(err.toString());
                }
              }
            }
            return;
          }
        }
        if (
          internal_cache
            .get("nasa_apod_cache")
            .includes(moment().format("YYYY_MM_DD"))
        ) {
          m.edit(config.emojis.happy_look + " i got it!");

          let body = internal_cache.get("nasa_apod_cache").get(args[1]);
          if (body.hdurl == undefined) {
            const embed = new EmbedBuilder()
              .setTitle(`${body.title}`)
              .setDescription(`${body.explanation}`)
              .setColor(config.colors.embed_gray);
            m.channel.send({ embeds: [embed] });
          } else {
            const embed = new EmbedBuilder()
              .setTitle(`${body.title}`)
              .setDescription(`${body.explanation}`)
              .setImage(`${body.hdurl}`)
              .setColor(config.colors.embed_gray);
            m.channel.send({ embeds: [embed] });
          }
        } else {
          m.edit(config.emojis.happy_look + " found it!");

          const { body } = await superagent.get(
            `https://api.nasa.gov/planetary/apod?api_key=${
              require("../../../../../ipkg/config/h.json").api_keys.nasa
            }`
          );
          internal_cache.push(
            "nasa_apod_cache",
            `${moment().format("YYYY_MM_DD")}:${JSON.stringify(body)}`
          );
          if (body.hdurl == undefined) {
            const embed = new EmbedBuilder()
              .setTitle(`${body.title}`)
              .setDescription(`${body.explanation}`)
              .setColor(config.colors.embed_gray);
            m.channel.send({ embeds: [embed] });
          } else {
            const embed = new EmbedBuilder()
              .setTitle(`${body.title}`)
              .setDescription(`${body.explanation}`)
              .setImage(`${body.hdurl}`)
              .setColor(config.colors.embed_gray);
            m.channel.send({ embeds: [embed] });
          }
        }
      });
  },
};
