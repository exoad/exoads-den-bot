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
const internal = require("../../../ipkg/config/h.json");

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

app.get("/", (r, res) => res.send("The bot is online! :DD"));
app.listen(port, () => console.log("Alive on port: " + port));

config.commands.prefixing.forEach((x) => (bot[x] = new Collection()));

bot.setMaxListeners(15);
bot.once("ready", () => {
  console.log("API is ready");
  console.log(
    "Entered as: " + bot.user?.username + "#" + bot.user?.discriminator
  );
});

bot.login(internal["BOT-TOKEN"]);
