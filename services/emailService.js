import transporter from "../config/transporter.js";
import { log } from "../utils/logger.js";

export default async function mailService(mailOptions) {
    try {
        // console.log(mailOptions)

        const info = await transporter.sendMail(mailOptions);

        await log(
            `SUCCESS | To: ${mailOptions.to} | Subject: ${mailOptions.subject} | MessageID: ${info.messageId}`
        );

        if (info.rejected.length > 0) {
            await log(
                `PARTIAL REJECT | To: ${mailOptions.to} | Rejected: ${info.rejected.join(", ")}`
            );
        }

        return info;
    } catch (err) {
        await log(
            `FAILED | To: ${mailOptions.to} | Subject: ${mailOptions.subject} | Error: ${err.message}`
        );

        throw err;
    }
}