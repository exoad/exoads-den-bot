// Copyright 2023 Jack Meng. All rights reserved.
// Use of this source code is governed by a BSD-style
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

const bot = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

console.log(_.black.bgRedBright.bold.italic("Starting up the bot..."));

app.get("/", (_r, res) => res.send("The bot is online! :DD"));
app.listen(port, () => console.log("Alive on port: " + port));

config.commands.prefixing.forEach((x) => (bot[x] = new Collection()));
["commands", "events"].forEach((x) => require("./handlers/" + x + ".js")(bot));

bot.setMaxListeners(15);
bot.once("ready", () => {
  console.log(_.bold.green("API is ready"));
  console.log(
    _.cyan("Entered as: ") +
      _.underline(bot.user?.username + "#" + bot.user?.discriminator)
  );
});

bot.on("messageCreate", async (msg) => {
  if (
    // @ts-ignore
    msg.content == `<@${bot.user.id}>` ||
    // @ts-ignore
    msg.content == `<@!${bot.user.id}>`
  )
    msg.channel.send(
      `My prefix is: \`${config.prefix}\`\nUse \`${config.prefix}help\` to get commands to use`
    );
});

bot.login(internal["BOT-TOKEN"]);
