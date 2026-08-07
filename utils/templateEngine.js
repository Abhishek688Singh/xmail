import fs from "fs-extra"
import mailService from "../services/emailService.js";
import { ending, log } from "../utils/logger.js"

async function templateEngine(data) {
    const arr = [...data];

    try {
        for (const element of arr) {
            try {
                console.log(element)

                //Verify that file exist at given location or not
                await validateAttachment(element);

                const result = await mailService({
                    from: `${process.env.FROM_NAME} <${process.env.SMTP_USER}>`,
                    to: element.to,
                    subject: element.subject,
                    text: element.text,
                    html: `<p>${element.html}</p>`,
                    attachments: element.attachment
                        ? [
                            {
                                filename: element.attachment.split("/").pop(),
                                path: element.attachment,
                            },
                        ]
                        : [],
                });

                console.log(`✅ Email sent to ${element.to}`);
                console.log("Message ID:", result.messageId);
                await new Promise(r => setTimeout(r, 2000));

            } catch (err) {
                console.error(`❌ Failed to send email to ${element.to}`);
                console.error(err.message);
            }
        }
    } finally {
        await ending()
    }

}

export default templateEngine;


async function validateAttachment(element) {
    if (!element.attachment) return;

    const exists = await fs.pathExists(element.attachment);

    if (!exists) {
        await log(
            `FAILED | To: ${element.to} | Subject: ${element.subject} | Error: Attachment not found (${element.attachment})`
        );

        throw new Error(`Attachment not found: ${element.attachment}`);
    }
}