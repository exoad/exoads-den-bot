// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const { EmbedBuilder } = require("discord.js");

const fx_message = require("../../fx_Messages.js");

module.exports = {
  config: {
    name: "probe",
    category: "Image",
    description: "Access certain functions related to image manipulation",
    usage: "This command is highly specific! You first must provide a link to an image (or you can use the dynamic version of this command with \"dynprobe\"), then the method you want to use (you can provide just the \"list\" argument to see avaliable options, and then set properties after in the format of:\nproperty1_name=property1_value property2_name=property2_value.]\n\nFinal format:\nprobe [argument/link] [method_name] [properties]\n\nExample: probe https://cdn.website/image.png gaussian_blur iterations=1\n\nAvaliable arguments: {list,docs}",
    aliases: [``],
  },
  run: async (
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    /** @type {any} */ args,
    /** @type {any} */ config,
    /** @type {any} */ bot_db
  ) => {
    // @ts-ignore
    msg.channel.send(fx_message.search_message()).then(async (m) => {
      
    });
  },
};
