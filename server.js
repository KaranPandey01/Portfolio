require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname)));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, company, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address' });
  }

  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,   // sends to your own Gmail
      subject: `[Portfolio] New message from ${name} — ${subject}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { background:#07090d; color:#dde4ee; font-family:'Courier New',monospace; margin:0; padding:0; }
    .wrap { max-width:600px; margin:0 auto; padding:32px 24px; }
    .header { border-bottom:1px solid rgba(0,255,136,0.2); padding-bottom:20px; margin-bottom:28px; }
    .logo { font-size:14px; font-weight:700; color:#00ff88; letter-spacing:0.1em; }
    .logo span { color:#5a6a82; }
    .tag { display:inline-block; font-size:10px; color:#00ff88; border:1px solid rgba(0,255,136,0.3); padding:3px 10px; border-radius:2px; letter-spacing:0.1em; margin-bottom:16px; }
    h2 { font-size:22px; color:#fff; margin:0 0 4px; }
    .sub { font-size:12px; color:#5a6a82; margin-bottom:28px; }
    .field { margin-bottom:18px; }
    .field-label { font-size:10px; color:#5a6a82; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:6px; }
    .field-val { font-size:14px; color:#dde4ee; background:#0c1018; border:1px solid rgba(0,255,136,0.1); border-radius:4px; padding:12px 14px; }
    .message-val { white-space:pre-wrap; line-height:1.7; }
    .footer { border-top:1px solid rgba(0,255,136,0.1); padding-top:18px; margin-top:28px; font-size:11px; color:#3d4d60; }
    a { color:#00ff88; }
  </style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <div class="logo">KP<span>/</span>SYS</div>
  </div>
  <div class="tag">NEW_CONTACT_SUBMISSION</div>
  <h2>You got a message </h2>
  <p class="sub">Received at ${timestamp} IST via portfolio contact form</p>

  <div class="field">
    <div class="field-label">Name</div>
    <div class="field-val">${name}</div>
  </div>
  <div class="field">
    <div class="field-label">Email</div>
    <div class="field-val"><a href="mailto:${email}">${email}</a></div>
  </div>
  <div class="field">
    <div class="field-label">Opportunity Type</div>
    <div class="field-val">${subject}</div>
  </div>
  ${company ? `
  <div class="field">
    <div class="field-label">Company / Organization</div>
    <div class="field-val">${company}</div>
  </div>` : ''}
  <div class="field">
    <div class="field-label">Message</div>
    <div class="field-val message-val">${message}</div>
  </div>

  <div class="footer">
    Reply directly to this email to respond to ${name} at ${email}<br>
    karan-portfolio.vercel.app · karanpandey569@gmail.com
  </div>
</div>
</body>
</html>
      `,
    });

    await transporter.sendMail({
      from: `"Karan Pandey" <${process.env.GMAIL_USER}>`,
      to: email,
      replyTo: process.env.GMAIL_USER,
      subject: `Hey ${name} — got your message! 👋`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { background:#07090d; color:#dde4ee; font-family:'Courier New',monospace; margin:0; padding:0; }
    .wrap { max-width:600px; margin:0 auto; padding:32px 24px; }
    .header { border-bottom:1px solid rgba(0,255,136,0.2); padding-bottom:20px; margin-bottom:28px; }
    .logo { font-size:14px; font-weight:700; color:#00ff88; letter-spacing:0.1em; }
    .logo span { color:#5a6a82; }
    .greeting { font-size:20px; color:#fff; font-weight:700; margin-bottom:12px; }
    .body-text { font-family:Arial,sans-serif; font-size:14px; color:#8899aa; line-height:1.75; margin-bottom:20px; }
    .body-text strong { color:#dde4ee; font-weight:500; }
    .divider { border:none; border-top:1px solid rgba(0,255,136,0.1); margin:24px 0; }
    .recap-label { font-size:10px; color:#5a6a82; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:14px; }
    .recap-box { background:#0c1018; border:1px solid rgba(0,255,136,0.12); border-radius:6px; padding:20px; }
    .recap-row { display:flex; gap:12px; margin-bottom:12px; }
    .recap-row:last-child { margin-bottom:0; }
    .rkey { font-size:10px; color:#5a6a82; text-transform:uppercase; letter-spacing:0.08em; min-width:90px; padding-top:2px; }
    .rval { font-size:13px; color:#dde4ee; flex:1; }
    .rval.msg { white-space:pre-wrap; line-height:1.65; color:#8899aa; font-family:Arial,sans-serif; }
    .sign-off { font-family:Arial,sans-serif; font-size:14px; color:#8899aa; line-height:1.75; }
    .sign-name { font-size:16px; color:#fff; font-weight:600; margin-top:12px; }
    .sign-title { font-size:12px; color:#00ff88; }
    .footer { border-top:1px solid rgba(0,255,136,0.1); padding-top:16px; margin-top:28px; font-size:11px; color:#3d4d60; font-family:Arial,sans-serif; }
    a { color:#00ff88; text-decoration:none; }
  </style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <div class="logo">KP<span>/</span>SYS</div>
  </div>

  <div class="greeting">Hey ${email} </div>

  <p class="body-text">
    Thanks for reaching out! I've received your message and will get back to you as soon as possible — 
    usually <strong>within 24 hours</strong>.
  </p>
  <p class="body-text">
    Here's a copy of what you sent, so you have it on record:
  </p>

  <hr class="divider">
  <div class="recap-label">Your submission</div>
  <div class="recap-box">
    <div class="recap-row">
      <span class="rkey">Name</span>
      <span class="rval">${name}</span>
    </div>
    <div class="recap-row">
      <span class="rkey">Email</span>
      <span class="rval">${email}</span>
    </div>
    <div class="recap-row">
      <span class="rkey">Type</span>
      <span class="rval">${subject}</span>
    </div>
    ${company ? `
    <div class="recap-row">
      <span class="rkey">Company</span>
      <span class="rval">${company}</span>
    </div>` : ''}
    <div class="recap-row">
      <span class="rkey">Message</span>
      <span class="rval msg">${message}</span>
    </div>
  </div>
  <hr class="divider">

  <p class="sign-off">
    Looking forward to connecting. Feel free to also reach me directly at 
    <a href="mailto:karanpandey569@gmail.com">karanpandey569@gmail.com</a> 
    or on <a href="https://linkedin.com/in/karanpandey">LinkedIn</a>.
  </p>
  <div class="sign-name">Karan Pandey</div>
  <div class="sign-title">Backend Engineer · SRM Delhi NCR · B.Tech CSE '27</div>

  <div class="footer">
    This is an automated confirmation. To reply, just respond to this email or contact Karan directly.<br>
    © 2026 Karan Pandey · karanpandey569@gmail.com
  </div>
</div>
</body>
</html>
      `,
    });

    return res.json({ success: true });

  } catch (err) {
    console.error('Email error:', err);
    return res.status(500).json({ success: false, error: 'Failed to send email. Please try again.' });
  }
});

// Fallback — serve index.html for any unknown route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n Portfolio server running at http://localhost:${PORT}`);
  console.log(`   Open http://localhost:${PORT} in your browser\n`);
});
