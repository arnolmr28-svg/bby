const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "../../data");
const MEMORY_FILE = path.join(DATA_DIR, "memory.json");

function ensureMemoryFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(MEMORY_FILE)) {
    fs.writeFileSync(MEMORY_FILE, JSON.stringify({}, null, 2));
  }
}

function loadMemory() {
  ensureMemoryFile();

  try {
    return JSON.parse(fs.readFileSync(MEMORY_FILE, "utf8"));
  } catch {
    return {};
  }
}

function saveMemory(memory) {
  ensureMemoryFile();

  fs.writeFileSync(
    MEMORY_FILE,
    JSON.stringify(memory, null, 2)
  );
}

function getUserMemory(userId) {
  const memory = loadMemory();

  return memory[userId] || {};
}

function setUserMemory(userId, data) {
  const memory = loadMemory();

  memory[userId] = {
    ...(memory[userId] || {}),
    ...data
  };

  saveMemory(memory);
}

module.exports = {
  getUserMemory,
  setUserMemory
};
