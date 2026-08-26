const { BOT_NAME } = require("./config");

function handleMessage(message) {
  const text = String(message || "").trim();

  if (!text) {
    return null;
  }

  if (text.toLowerCase().includes(`@${BOT_NAME}`)) {
    const question = text
      .replace(new RegExp(`@${BOT_NAME}`, "ig"), "")
      .trim();

    if (!question) {
      return `আমি ${BOT_NAME} 😎 আমাকে কিছু জিজ্ঞেস করো।`;
    }

    return `তুমি বলেছো: "${question}"\n\nআমি ${BOT_NAME} — AI system এখনো connect করা হয়নি।`;
  }

  return null;
}

module.exports = {
  handleMessage
};
