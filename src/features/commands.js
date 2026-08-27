const { BOT_NAME } = require("../core/config");

function handleCommand(command) {
  const text = String(command || "").trim().toLowerCase();

  if (text === "ping") {
    return "Pong! 🏓 bby is online.";
  }

  if (text === "version") {
    return `${BOT_NAME} v1.0.0`;
  }

  if (text === "help") {
    return `
🤖 ${BOT_NAME} Commands

@${BOT_NAME} help
→ Commands দেখাবে

@${BOT_NAME} ping
→ Bot online কিনা পরীক্ষা

@${BOT_NAME} version
→ Bot version দেখাবে

@${BOT_NAME} status
→ System status
`;
  }

  return null;
}

module.exports = {
  handleCommand
};
