// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

module.exports = async (
  /** @type {{ user: { setActivity: (arg0: string) => void; }; }} */ bot
) => {
  console.log("[READY_EVENT_HANDLER] Online...");
  bot.user.setActivity("pixiv");
};
