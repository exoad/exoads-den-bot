// Copyright 2023 Jack Meng. All rights reserved.
// Use of this source code is governed by a GPL-style
// license that can be found in the LICENSE file.

const { readdirSync } = require("fs");
const config = require("../../../config/bot.json");
const _ = require("ansi-colors");
let count = 0;

module.exports = async (
  /** @type {{ on: (arg0: string, arg1: any) => void; }} */ bot
) => {
  const load = (/** @type {string} */ dirs) => {
    const events = readdirSync("./pkg/js/src/events/" + dirs + "/").filter(
      (d) => d.endsWith(".js")
    );
    for (let f of events) {
      const evt = require("../events/" + dirs + "/" + f);
      let name = f.split(".")[0];
      bot.on(name, evt.bind(null, bot));
      console.log(
        "\t" +
          (count + 1) +
          ") Event | " +
          _.green.bold(name) +
          " has loaded."
      );
      count++;
    }
  };
  ["client"].forEach((x) => load(x));
};
