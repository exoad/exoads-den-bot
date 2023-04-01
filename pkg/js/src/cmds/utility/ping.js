// Copyright 2023 Jack Meng. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

module.exports = {
  config: {
    name: "ping",
    category: "Utility",
    description: "Perform a latency test",
    usage: "No argument accepted",
    aliases: ["pong"],
  },
  run: async (
    /** @type {{ ws: { ping: number; }; }} */ bot,
    /** @type {{ channel: { send: (arg0: string) => Promise<any>; }; createdTimestamp: number; }} */ msg,
    /** @type {any} */ args,
    /** @type {any} */ config
  ) => {
    msg.channel
      .send("Playing ping pong... :ping_pong:")
      .then((/** @type {{ edit: (arg0: string) => void; }} */ m) => {
        let client = Date.now() - msg.createdTimestamp;
        let api = Math.round(bot.ws.ping);
        m.edit(
          (client <= 75
            ? ":green_circle:"
            : client > 75 && client <= 135
            ? ":yellow_circle:"
            : ":red_circle:") +
            " **Client Latency:** " +
            client +
            "ms" +
            "\n" +
            (api <= 75
              ? ":green_circle:"
              : api > 75 && api <= 135
              ? ":yellow_circle:"
              : ":red_circle:") +
            " **API Latency:** " +
            api +
            "ms\n"
        );
      });
  },
};
