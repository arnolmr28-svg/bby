const readline = require("readline");
const { BOT_NAME } = require("./core/config");
const { handleMessage } = require("./core/router");

let USER_ID = "local-user-001";

console.log(`
==============================
        ${BOT_NAME.toUpperCase()} AI
==============================
Status: ONLINE
Mode: Development
User: ${USER_ID}
`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "You > "
});

console.log(`
Commands:
 /user 001  → change user
 /user 002  → change user
`);

console.log(`Type @${BOT_NAME} followed by a message.`);
rl.prompt();

rl.on("line", async (line) => {
  const text = line.trim();

  // Change user command
  if (text.startsWith("/user")) {
    const id = text.split(" ")[1];

    if (id) {
      USER_ID = `local-user-${id}`;
      console.log(`\nSystem > Current user changed: ${USER_ID}\n`);
    }

    rl.prompt();
    return;
  }

  try {
    const response = await handleMessage(text, USER_ID);

    if (response) {
      console.log(`\n${BOT_NAME} > ${response}\n`);
    } else {
      console.log(`\n${BOT_NAME} > আমাকে mention করে প্রশ্ন করো: @${BOT_NAME} ...\n`);
    }
  } catch (error) {
    console.error(`\n${BOT_NAME} > Error: ${error.message}\n`);
  }

  rl.prompt();
});

rl.on("close", () => {
  console.log(`\n${BOT_NAME} stopped.`);
  process.exit(0);
});
