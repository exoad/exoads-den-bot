// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { Database } = require("secure-db");

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

module.exports = { interaction_increment, interactions };
