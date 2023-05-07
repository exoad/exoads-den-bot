// Copyright 2023 Jack Meng. All rights reserved.
// Use of this source code is governed by a GPL-style
// license that can be found in the LICENSE file.

const {
  Client,
  GatewayIntentBits,
  Collection,
  IntentsBitField,
  cleanContent,
} = require("discord.js");

const config = require("../../config/bot.json");
const internal = require("../../../ipkg/config/h.json"); // should only be required here

const _ = require("ansi-colors");
const express = require("express");
const app = express();
const port = config.local["server-port"];
const { Database } = require("secure-db");
const dbnames = require("../../config/db-names.json");
const cache_db = new Database(dbnames["internal-cache"]);

const bot = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  ws: { properties: { browser: 'Discord iOS' } }
});

console.log(_.black.bgRedBright.bold.italic("Starting up the bot..."));

app.get("/", (_r, res) => res.send("The bot is online! :DD"));
app.listen(port, () => console.log("Alive on port: " + port));

["aliases", "commands", "description", "category"].forEach(
  (x) => (bot[x] = new Map())
);
["cmd", "events"].forEach((x) => {
  console.log(_.bold.cyan("Requiring a handler: ") + _.underline(x));
  require("./handlers/" + x + ".js")(bot);
});

bot.setMaxListeners(25);
bot.once("ready", () => {
  console.log(_.bold.green("API is ready"));
  console.log(
    _.cyan("Entered as: ") +
      _.underline(bot.user?.username + "#" + bot.user?.discriminator)
  );
});
const fx = require("./fx");

bot.on("messageCreate", async (msg) => {
  if (
    // @ts-ignore
    msg.content == `<@${bot.user.id}>` ||
    // @ts-ignore
    msg.content == `<@!${bot.user.id}>`
  )
    msg.channel.send(
      `hoi! my prefix is: \`${config.prefix}\`\nyou then can use \`${config.prefix}help\` to get more information on commands you can use!`
    );
  else if (
    fx.match_arr(msg.content, [
      "hello daoxe",
      "yo daoxe",
      "hi daoxe",
      "hoi daoxe",
      "daoxe :3",
      "heya daoxe",
      "daoxe?",
    ])
  ) {
    msg.reply(fx.randomFromArr(config.dynamics.hello));
    return;
  }
});

bot.login(internal["BOT-TOKEN"]);
