// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.
// @ts-nocheck
// @ts-ignore
const { EmbedBuilder, AttachmentBuilder } = require("discord.js");

// @ts-ignore
const fx_message = require("../../fx_Messages.js");
// @ts-ignore
const fx = require("../../fx.js");

module.exports = {
  config: {
    name: "eula",
    category: "Utility",
    description: "User Agreement",
    usage: "No Arguments Accepted",
    aliases: [`rules`],
  },
  run: async (
    // @ts-ignore
    /** @type {{ commands: any[]; }} */ bot,
    /** @type {{ channel: { send: (arg0: { embeds: EmbedBuilder[]; }) => void; }; }} */ msg,
    // @ts-ignore
    /** @type {any} */ args,
    // @ts-ignore
    /** @type {any} */ config,
    // @ts-ignore
    /** @type {any} */ bot_db
  ) => {
    var attach = new AttachmentBuilder(
      Buffer.from(
        `
#__ LICENSE AGREEMENT FOR "DAOXE" __

*IMPORTANT - READ CAREFULLY: This License Agreement ("Agreement") is a legal agreement
between you (either an individual or a single entity) and the developer of "daoxe"
("Jack Meng") regarding your use of "daoxe". By using "daoxe", you agree to be bound by
the terms of this Agreement.*

# GRANT OF LICENSE

> The "daoxe" is licensed, not sold, to you for use only under the terms of this Agreement.
  The developer of "daoxe" grants you a non-exclusive, non-transferable, limited license to use
  "daoxe" solely for legal purposes and in accordance with the terms of this Agreement.

# COLLECTION OF USER DATA

> The "daoxe" collects certain user data, including but not limited to messages sent in
  channels, interactions with other bots, and other common actions performed on Discord. By
  using "daoxe", you agree that "daoxe" may collect and use such data for legal purposes only.

# USE OF USER DATA

> The developer of "daoxe" agrees not to sell or leak your data. The "daoxe" will use the
  collected data solely for legal purposes, including but not limited to improving the
  functionality and performance of "daoxe", and providing technical support to users of
  "daoxe".

# LIMITATIONS ON USE

> You may not reverse engineer or exploit "daoxe", except to the extent that such activity
  is expressly permitted by applicable law. You may not use "daoxe" for commercial purposes.

# DISCLAIMER OF WARRANTIES

> The developer of "daoxe" does not warrant that "daoxe" will meet your requirements or
  that the operation of "daoxe" will be uninterrupted or error-free.

# LIMITATION OF LIABILITY

> In no event shall the developer of "daoxe" be liable for any damages (including, without
  limitation, lost profits, business interruption, or lost information) arising out of the
  use of or inability to use "daoxe", even if the developer of "daoxe" has been advised of
  the possibility of such damages.

# GOVERNING LAW

> This Agreement shall be governed by and construed in accordance with the laws of the
  jurisdiction in which the developer of "daoxe" is located, without giving effect to any
  choice of law or conflict of law provision or rule.

# ENTIRE AGREEMENT

> This Agreement constitutes the entire agreement between you and the developer of "daoxe"
  and supersedes all prior or contemporaneous communications and proposals, whether oral or
  written, between the parties with respect to "daoxe".

# MODIFICATIONS TO AGREEMENT

> The developer of "daoxe" may modify this Agreement at any time, and such modifications
  shall be effective immediately upon posting of the modified Agreement on "daoxe"'s website
  or other designated location. Your continued use of "daoxe" after such modifications shall
  be deemed to constitute your acceptance of the modified Agreement.
        `
      )
    ).setName("daoxe_EULA.md");
    msg.channel.send({ files: [attach] });
  },
};
