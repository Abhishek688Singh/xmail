import fs from "fs/promises";

const LOG_FILE = "./logs/email.log";

export async function log(message) {
    const timestamp = new Date().toISOString();
    await fs.appendFile(LOG_FILE, `[${timestamp}] ${message}\n`);
}

export async function ending() {
    await fs.appendFile(LOG_FILE, `-----------------------------------------------------\n`)
}