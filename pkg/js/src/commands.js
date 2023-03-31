// Copyright 2023 Jack Meng. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

const { readdirSync } = require("fs");
const moment = require("moment");
const _ = require("ansi-colors");
const config = require("../../config/bot.json");
const { CachedManager } = require("discord.js");
let count = 0;
module.exports = (bot) => {
  const load = (dirs) => {
    const commands = readdirSync("./pkg/js/src/cmds/" + dirs).filter(
      (d) => d.endsWith(".js") || d.endsWith(".jsm")
    );
    for (let f of commands) {
      try {
        let cmd = require("../cmds/" + dirs + "/" + f);
        bot.commands.set(cmd.config.name, cmd);
        if (cmd.config.aliases) {
          cmd.config.aliases.forEach((a) =>
            bot.aliases.set(a, cmd.config.name)
          );
        }
        console.log(
          count +
            1 +
            ") Command | " +
            cmd.config.name +
            " has loaded" +
            " | Category: " +
            cmd.config.category
        );
        count++;
      } catch (er) {
        console.log(
          _.white.underline.bold.italic.bgRedBright("Failed to load: ") +
            "../cmds/" +
            dirs +
            "/" +
            f
        );
      }
    }
  };
  console.log(_.underline.yellow("Loaded:") + " " + count + " commands");
  config.commands.categories.forEach((x) => load(x.toLowerCase()));
};
