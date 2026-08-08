# 📧 XMail

> **A lightweight, template-driven bulk email sender built with Node.js and Nodemailer.**
>
> Send personalized emails to multiple recipients using JSON, reusable templates, and file attachments with minimal configuration.

---

## ✨ Features

- 📤 Send emails to one or many recipients
- 📄 Read recipients from a JSON file
- 📨 Plain text + HTML email support
- 📎 File attachments
- 🧩 Reusable email templates
- 🔐 Environment variable configuration
- 📋 Detailed logging
- ⏳ Configurable delay between emails
- 🛡️ Graceful error handling
- ⚡ Simple and lightweight

---

# 📂 Project Structure

```
xmail/
│
├── attachments/              # Files to attach
│   └── offer.pdf             # Put Your Files here
│
├── config/
│   └── transporter.js        # Nodemailer transporter
│
├── services/
│   └── emailService.js       # Wrapper around transporter.sendMail()
│
├── utils/
│   ├── logger.js
│   └── templateEngine.js
│
├── recipient.json            # Recipient list
├── index.js                  # Entry point
├── .env
├── .env.example
├── package.json
└── README.md
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/yourusername/xmail.git

cd xmail
```

Install dependencies

```bash
npm install
```

---

# 📦 Dependencies

```text
nodemailer
dotenv
fs-extra
nodemon
```

---

# 🔐 Environment Variables

Create a `.env`

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password

FROM_NAME=Your Name
```

---

# 🔑 Gmail Setup

Since Gmail no longer supports "Less Secure Apps", you must use an **App Password**.

### Step 1

Enable **2-Step Verification**

### Step 2

Generate an App Password

```
Google Account
    ↓
Security
    ↓
2-Step Verification
    ↓
App Passwords
```

Copy the generated 16-character password into

```
SMTP_PASS
```

---

# 📝 Recipient File

Recipients are stored in

```
recipient.json
```

Example

```json
[
    {
        "to": "john@example.com",
        "subject": "Welcome",
        "text": "Hello John!",
        "html": "<h1>Hello John!</h1>",
        "attachment": "./attachments/offer.pdf"
    },
    {
        "to": "alice@example.com",
        "subject": "Offer Letter",
        "text": "Congratulations!",
        "html": "<h2>Congratulations!</h2>",
        "attachment": "./attachments/offer.pdf"
    }
]
```

Each object represents one email.

---

# 📎 Attachments

Attach any file by specifying its path.

```json
{
    "attachment": "./attachments/resume.pdf"
}
```

Supported formats include

- PDF
- DOCX
- Images
- ZIP
- Text files
- Videos
- Any file supported by Nodemailer

---

# 📧 Email Templates

Both plain text and HTML are supported.

Example

```json
{
    "text": "Hello John",

    "html": "<h1>Hello John</h1>"
}
```

Most email clients render the HTML version.

Clients that don't support HTML automatically display the plain text version.

---

# ▶️ Running the Project

Development

```bash
npm start
```

or

```bash
nodemon index.js
```

Production

```bash
node index.js
```

---

# ⚙️ Workflow

```
recipient.json
        │
        ▼
templateEngine()
        │
        ▼
Create Email Object
        │
        ▼
mailService()
        │
        ▼
Nodemailer
        │
        ▼
SMTP Server
        │
        ▼
Recipient
```

---

# 📚 Email Object

Every recipient is converted into

```javascript
{
    from,
    to,
    subject,
    text,
    html,
    attachments
}
```

which is passed to

```javascript
transporter.sendMail()
```

---

# 📜 Logs

The application prints useful logs

```
SMTP Connected

Sending email...

Email sent to john@example.com

Message ID:
<abcd123@gmail.com>

Waiting 2 seconds...

Sending next email...
```

If an email fails

```
Failed to send email

Reason:
Invalid recipient
```

The application continues sending the remaining emails.

---

# ⏳ Delay Between Emails

A small delay prevents SMTP rate limiting.

Example

```javascript
await new Promise(resolve => setTimeout(resolve, 2000));
```

Current delay

```
2 seconds
```

---

# 🛠 Customization

You can easily extend XMail to support

- Scheduled emails
- Email queues
- CSV imports
- Excel imports
- Template placeholders
- Markdown templates
- Inline images
- CC / BCC
- Reply-To
- Multiple attachments
- Retry on failure
- Progress bar
- CLI support
- Email tracking
- Open tracking
- Click tracking

---

# 📖 Example Email

Subject

```
Offer Letter
```

Body

```html
<h1>Congratulations!</h1>

<p>
We're excited to welcome you to our team.
</p>
```

Attachment

```
offer.pdf
```
---

# ❌ Common Errors

## Missing credentials

```
Error:
Missing credentials for "PLAIN"
```

Possible reasons

- SMTP_USER missing
- SMTP_PASS missing
- dotenv not loaded
- Invalid transporter configuration

---

## Authentication Failed

```
535 Authentication Failed
```

Possible reasons

- Wrong App Password
- 2FA disabled
- Incorrect Gmail account

---

## Attachment Not Found

```
ENOENT
```

Reason

```
Wrong file path
```

---

# 🧪 Testing

Instead of sending real emails you can use

- Ethereal Email
- Mailtrap
- Stream Transport
- Gmail to your own inbox

---

# 🔒 Security

Never commit

```
.env
```

Never expose

- SMTP password
- App Password
- API keys

Always use

```
.env.example
```

---

# 📌 Future Improvements

- [ ] Handlebars templates
- [ ] MJML support
- [ ] CSV importer
- [ ] Excel importer
- [ ] CLI commands
- [ ] Progress bar
- [ ] Parallel sending
- [ ] Retry queue
- [ ] Scheduled emails
- [ ] Template variables
- [ ] Image embedding
- [ ] Docker support
- [ ] Unit tests

---

# 🤝 Contributing

Contributions are welcome.

Feel free to

- Open an issue
- Submit a pull request
- Suggest improvements
- Report bugs

---

# 📄 License

MIT License

---

# ❤️ Built With

- Node.js
- Nodemailer
- fs-extra
- dotenv

---

> If you found this project useful, consider giving it a ⭐ on GitHub!

[
  {
    "to": "developer@example.com",
    "subject": "🎉 Welcome to XMail",
    "text": "Hello Alex,\n\nWelcome to XMail!\n\nYour account has been successfully created. We're excited to have you on board.\n\nPlease find the getting-started guide attached to this email.\n\nBest regards,\nAbhishek Singh\nXMail Team",
    "html": "<h2>🎉 Welcome to XMail!</h2> 
            <p>Hello <strong>Alex</strong>,</p>
            <p>Your account has been successfully created. We're excited to have you on board!</p>
            <p>Please find the <strong>getting-started guide</strong> attached to this email.</p>
            <p>Best regards,<br><strong>Abhishek Singh</strong><br>XMail Team</p>",
    "attachment": "./attachments/getting-started-guide.pdf"
  }
]


