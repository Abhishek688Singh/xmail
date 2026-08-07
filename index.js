import fs from "fs-extra"
import templateEngine from "./utils/templateEngine.js"
import transporter from "./config/transporter.js";

async function verifyy(params) {
    try {
        await transporter.verify();
        console.log("✅ SMTP connection verified");
    } catch (err) {
        console.error(err);
    }
}

async function readMyJson() {
    try {
        let data = await fs.readJson("./recipient.json")
        templateEngine(data)
    }
    catch (err) {
        console.log(err)
    }
}

/**
 * Development Mode:
 * - `verifyy()`   → Verify SMTP connection only.
 * - `readMyJson()` → Send emails from `recipient.json`.
 *
 * Uncomment the function you want to run and comment out the other.
 */

// verifyy();
readMyJson();