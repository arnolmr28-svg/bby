const { OWNER_NAME } = require("../core/config");
const { getUserMemory, setUserMemory } = require("../core/memory");

function isOwner(userId) {
  return userId === "local-user-001";
}

function handleAdminCommand(command, userId) {
  const text = command.toLowerCase().trim();

  const adminCommands = [
    "status",
    "my info",
    "clear my memory"
  ];

  if (adminCommands.includes(text)) {
    if (!isOwner(userId)) {
      return "❌ এই command শুধুমাত্র owner-এর জন্য।";
    }
  }

  if (!isOwner(userId)) {
    return null;
  }

  if (text === "status") {
    return `
BBY Status:

✅ AI Engine Online
✅ Memory Active
✅ User System Active
✅ Owner: ${OWNER_NAME}
`;
  }

  if (text === "my info") {
    const memory = getUserMemory(userId);

    return `
User ID: ${userId}
Name: ${memory.name || "Unknown"}
`;
  }

  if (text === "clear my memory") {
    setUserMemory(userId, {});

    return "তোমার memory clear করা হয়েছে।";
  }

  return null;
}

module.exports = {
  handleAdminCommand
};
