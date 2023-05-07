// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder } = require("discord.js");

const fx_message = require("../../fx_Messages.js");
const fx = require("../../fx.js");

module.exports = {
  config: {
    name: "changes",
    category: "Utility",
    description: "View the changes made to the latest iteration!",
    usage: "No arguments accepted!",
    aliases: [`changelog`],
  },
  run: async (
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    /** @type {any} */ args,
    /** @type {any} */ config,
    /** @type {any} */ bot_db
  ) => {
    // @ts-ignore
    msg.channel.send(fx_message.search_message()).then(async (m) => {
      m.edit(config.emojis.happy_look + " found it!");
      fx.java("Changelog", "", function (callback) {
        m.channel.send({
          embeds: [
            fx.embed().setDescription("```ini\n" + callback.toString() + "```"),
          ],
        });
      });
    });
  },
};
