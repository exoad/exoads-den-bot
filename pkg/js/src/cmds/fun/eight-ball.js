// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "8ball",
    category: "Fun",
    description: "See what the 8ball says!",
    usage: "Any string will be taken",
    aliases: [],
  },
  run: async (
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    /** @type {any} */ args,
    /** @type {any} */ config
  ) => {
    function doRandHT() {
      var rand = [
        ":8ball: As I see it, yes.",
        ":8ball: Ask again later.",
        ":8ball: Better not tell you now.",
        ":8ball: Cannot predict now.",
        ":8ball: Concentrate and ask again.",
        ":8ball: Don’t count on it.",
        ":8ball: It is certain.",
        ":8ball: It is decidedly so.",
        ":8ball: Most likely.",
        ":8ball: My reply is no.",
        ":8ball: My sources say no.",
        ":8ball: Outlook not so good.",
        ":8ball: Outlook good.",
        ":8ball: Reply hazy, try again.",
        ":8ball: Signs point to yes.",
        ":8ball: Very doubtful.",
        ":8ball: Without a doubt.",
        ":8ball: Yes.",
        ":8ball: Yes – definitely.",
        ":8ball: You may rely on it.",
      ];
      return rand[Math.floor(Math.random() * rand.length)];
    }
    // @ts-ignore
    let user_prompt = msg.content.split(" ").slice(1);
    const embed = new EmbedBuilder()
      .setTitle(doRandHT())
      .setColor("Random")
      .setDescription(
        // @ts-ignore
        "**" + msg.author.username + " prompted:** " + user_prompt.join(" ")
      );
    msg.channel.send({ embeds: [embed] });
  },
};
