// Copyright 2023 Jack Meng. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

const { readdirSync } = require("fs");
const config = require("../../../config/bot.json");
const _ = require("ansi-colors");
let count = 0;

module.exports = (
  /** @type {{ on: (arg0: string, arg1: any) => void; }} */ bot
) => {
  const load = (/** @type {string} */ dirs) => {
    const events = readdirSync("./pkg/js/src/events/" + dirs + "/").filter(
      (d) => d.endsWith(".js") || d.endsWith(".jsm")
    );
    for (let f of events) {
      const evt = require("../events/" + dirs + "/" + f);
      let name = f.split(".")[0];
      bot.on(name, evt.bind(null, bot));
      console.log(
        count + 1 + ") Event | " + _.bgGreen.bold.white(name) + " has loaded."
      );
      count++;
    }
  };
  console.log(_.underline.yellow("Loaded:") + " " + count + " event handlers");
  ["client"].forEach((x) => load(x));
};
