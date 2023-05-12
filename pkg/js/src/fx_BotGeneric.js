// @ts-nocheck
// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { Database } = require("secure-db");

const { EmbedBuilder } = require("discord.js");
const moment = require("moment");
const config = require("../../config/bot.json");
const sha256 = require("sha256");

const bot_db = new Database("bot-telemetry-data-registry");

function validate() {
  if (!bot_db.has("bot")) {
    bot_db.set("bot", {});
  }
}

function interaction_increment() {
  validate();
  bot_db.set(
    "bot.interactions_counter",
    bot_db.get("bot.interactions_counter") + 1
  );
}

function interactions() {
  validate();
  return bot_db.get("bot.interactions_counter");
}

async function fetchAllMessages(bot_obj, channel_id) {
  const channel = bot_obj.channels.cache.get(channel_id);
  let messages = [];
  let message = await channel.messages
    .fetch({ limit: 1 })
    .then((messagePage) => (messagePage.size === 1 ? messagePage.at(0) : null));
  while (message) {
    await channel.messages
      .fetch({ limit: 100, before: message.id })
      .then((messagePage) => {
        messagePage.forEach((msg) => messages.push(msg));
        message =
          0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
      });
  }

  messages = messages.sort((x, y) => {
    return x.createdTimestamp < y.createdTimestamp
      ? -1
      : x.createdTimestamp > y.createdTimestamp
      ? 1
      : 0;
  });
  return messages;
}

const log_channel_id = "1104790548788822078";

function l0g(message_str, fields, bot_obj, msg_obj, color) {
  let x = sha256.x2("exoad" + moment().format("YYYYMMDDHH:mm:ss"));
  const embed = new EmbedBuilder()
    .setTitle("LogState[" + moment().format("YYYYMMDDHH:mm:ss") + "]")
    .setDescription("```log\n" + message_str + "\n```")
    .setColor(!color ? config.colors.embed_gray : color)
    .addFields(!fields || fields == null ? { name: "LogID", value: x } : fields)
    .setFooter({
      text: x,
    });
  bot_obj.channels.cache.get(log_channel_id).send({ embeds: [embed] });
}

module.exports = {
  interaction_increment,
  interactions,
  l0g,
  log_channel_id,
  fetchAllMessages,
};
