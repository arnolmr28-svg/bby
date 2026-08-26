const { BOT_NAME } = require("./config");
const { generateResponse } = require("./ai");
const { setUserMemory, getUserMemory } = require("./memory");
const { handleAdminCommand } = require("../features/admin");

async function handleMessage(message, userId = "local-user") {
  const text = String(message || "").trim();

  if (!text) {
    return null;
  }

  if (!text.toLowerCase().includes(`@${BOT_NAME}`)) {
    return null;
  }

  const question = text
    .replace(new RegExp(`@${BOT_NAME}`, "ig"), "")
    .trim();

  if (!question) {
    return `আমি ${BOT_NAME} 😎 আমাকে কিছু জিজ্ঞেস করো।`;
  }

  // Admin commands
  const adminResponse = handleAdminCommand(question, userId);

  if (adminResponse) {
    return adminResponse;
  }

  // Ask saved name
  if (
    question.includes("আমার নাম কী") ||
    question.toLowerCase().includes("what is my name")
  ) {
    const memory = getUserMemory(userId);

    if (memory.name) {
      return `তোমার নাম ${memory.name}। 😊`;
    }

    return "আমি এখনো তোমার নাম জানি না।";
  }

  // Save name
  const nameMatch = question.match(
    /(?:আমার নাম|my name is)\s+(.+)/i
  );

  if (nameMatch) {
    const name = nameMatch[1].trim();

    setUserMemory(userId, {
      name: name
    });

    return `ঠিক আছে ${name}! 😊 আমি মনে রাখলাম।`;
  }

  return await generateResponse(question, userId);
}

module.exports = {
  handleMessage
};
