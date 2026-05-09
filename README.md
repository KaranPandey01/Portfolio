# Karan Pandey — Portfolio Website

Multi-page portfolio with live system dashboard aesthetic.
Node.js + Express backend with Nodemailer for contact form emails.

---

## 📁 File Structure

```
karan-portfolio/
├── index.html          ← Home / Landing
├── about.html          ← About me
├── experience.html     ← 3 internships (YRRNA, TradeTron, EduSkills/Google)
├── projects.html       ← ProConnect + Fraud Detection
├── skills.html         ← Tech stack
├── contact.html        ← Contact form
├── shared.css          ← Shared styles across all pages
├── server.js           ← Express server + email API
├── package.json
├── .env.example        ← Copy to .env and fill in credentials
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up your Gmail App Password

> You need a Gmail **App Password** — NOT your real Gmail password.

Steps:
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. **Security** → **2-Step Verification** (turn it ON if not already)
3. **Security** → **App Passwords**
4. Select **"Mail"** + **"Other (custom name)"** → type `Portfolio`
5. Copy the 16-character password generated

### 3. Create your .env file
```bash
cp .env.example .env
```

Edit `.env`:
```
GMAIL_USER=karanpandey569@gmail.com
GMAIL_PASS=your16charpassword
PORT=3000
```

### 4. Run the server
```bash
# Development (auto-restart on changes)
npm run dev

# Production
npm start
```

Open **http://localhost:3000** in your browser.

---

## 📧 How the Email System Works

When someone submits the contact form:

1. **You receive an email** at `karanpandey569@gmail.com` with:
   - Sender's name, email, company
   - Opportunity type
   - Their full message
   - Timestamp (IST)

2. **They receive a confirmation email** with:
   - Greeting using their email address
   - Full recap of what they submitted
   - Your response timeline (24 hours)
   - Your direct contact details

---

## 🔧 Customise

| What to change | Where |
|---|---|
| Your real LinkedIn/GitHub URLs | All HTML files, `<a>` tags in nav + contact |
| Your real name/phone | `contact.html`, `about.html` |
| Response time promise | `contact.html` form note + `server.js` email template |
| Branding / colors | `shared.css` CSS variables at the top |

---

## 🌐 Deploy to Vercel (recommended)

Vercel supports Node.js serverless functions.

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Add Environment Variables in Vercel dashboard:
   - `GMAIL_USER` = karanpandey569@gmail.com
   - `GMAIL_PASS` = your app password
4. Deploy ✅

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `express` | Web server + static file serving |
| `nodemailer` | Sending emails via Gmail SMTP |
| `cors` | Cross-origin request handling |
| `dotenv` | Environment variable loading |
| `nodemon` | Auto-restart in development |
