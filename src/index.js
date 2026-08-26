const readline = require("readline");
const { BOT_NAME } = require("./core/config");
const { handleMessage } = require("./core/router");

console.log(`
==============================
        ${BOT_NAME.toUpperCase()} AI
==============================
Status: ONLINE
Mode: Development
`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "You > "
});

console.log(`Type @${BOT_NAME} followed by a message.`);
rl.prompt();

rl.on("line", async (line) => {
  try {
    const response = await handleMessage(line);

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
