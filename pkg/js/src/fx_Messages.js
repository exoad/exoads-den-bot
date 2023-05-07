// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.
const bot = require("../../config/bot.json");
const fx = require("./fx.js");

function search_message() {
  return (
    fx.randomFromArr([
      bot.emojis.writing_down,
      bot.emojis.reading_book,
      bot.emojis.happy_look,
      bot.emojis.workpls,
    ]) +
    " " +
    fx.randomFromArr(bot.premade_messages_endian)
  );
}

module.exports = { search_message };
