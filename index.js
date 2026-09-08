import crypto from 'node:crypto';

const secret = () => process.env.VERIFICATION_SECRET || 'CHANGE_ME_IN_VERCEL';
const b64 = (value) => Buffer.from(value).toString('base64url');
const unb64 = (value) => Buffer.from(value, 'base64url').toString();
const sign = (payload) => crypto.createHmac('sha256', secret()).update(payload).digest('base64url');

async function sendResendEmail({ to, subject, text }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not configured in Vercel.');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: process.env.SIPZA_FROM_EMAIL || 'SIPZA Notifications <onboarding@resend.dev>',
      to: [to],
      subject,
      text
    })
  });

  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data?.message || 'Resend failed.');
    error.status = response.status;
    throw error;
  }
  return data;
}

async function notify(req, res) {
  const to = process.env.SIPZA_NOTIFY_EMAIL || '2wenty9ine2929@gmail.com';
  const { _subject, name, email, phone, complaint } = req.body || {};
  const lines = [
    `Name: ${name || ''}`,
    `Email: ${email || ''}`,
    `Phone: ${phone || ''}`,
    complaint ? `\nComplaint:\n${complaint}` : ''
  ].filter(Boolean).join('\n');

  try {
    const data = await sendResendEmail({
      to,
      subject: _subject || 'SIPZA notification',
      text: lines
    });
    return res.status(200).json({ ok: true, id: data.id });
  } catch (error) {
    return res.status(error.status || 500).json({ error: error.message || 'Notification failed.' });
  }
}

async function sendCode(req, res) {
  if (secret() === 'CHANGE_ME_IN_VERCEL') {
    return res.status(500).json({ error: 'VERIFICATION_SECRET must be configured in Vercel.' });
  }

  const { email, name } = req.body || {};
  const cleanEmail = String(email || '').trim().toLowerCase();
  if (!cleanEmail) return res.status(400).json({ error: 'Email is required.' });

  const pin = String(crypto.randomInt(0, 1000000)).padStart(6, '0');
  const exp = Date.now() + 15 * 60 * 1000;
  const payload = JSON.stringify({ email: cleanEmail, code: pin, exp });
  const token = `${b64(payload)}.${sign(payload)}`;

  try {
    await sendResendEmail({
      to: cleanEmail,
      subject: 'SIPZA email verification code',
      text: `Hi ${name || 'there'},\n\nYour SIPZA verification code is: ${pin}\n\nThis code expires in 15 minutes. You must also click the verification link in the separate Firebase email to complete your signup.\n\nIf you did not create a SIPZA account, you can ignore this email.`
    });
    return res.status(200).json({ ok: true, token });
  } catch (error) {
    return res.status(error.status || 500).json({ error: error.message || 'Could not send verification code.' });
  }
}

async function verifyCode(req, res) {
  if (secret() === 'CHANGE_ME_IN_VERCEL') {
    return res.status(500).json({ error: 'VERIFICATION_SECRET must be configured in Vercel.' });
  }

  const { email, code, token } = req.body || {};
  try {
    const parts = String(token || '').split('.');
    if (parts.length !== 2) return res.status(400).json({ error: 'Verification session expired. Request a new code.' });

    const payload = unb64(parts[0]);
    const expected = sign(payload);
    const supplied = parts[1];
    if (expected.length !== supplied.length || !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(supplied))) {
      return res.status(400).json({ error: 'Invalid verification session.' });
    }

    const parsed = JSON.parse(payload);
    if (Date.now() > parsed.exp) return res.status(400).json({ error: 'That code has expired. Request a new one.' });
    if (String(email || '').trim().toLowerCase() !== parsed.email || String(code || '') !== parsed.code) {
      return res.status(400).json({ error: 'That verification code is incorrect.' });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(400).json({ error: error.message || 'Verification session is invalid.' });
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { action } = req.body || {};
  if (action === 'notify') return notify(req, res);
  if (action === 'send-code') return sendCode(req, res);
  if (action === 'verify-code') return verifyCode(req, res);

  return res.status(400).json({ error: 'Unknown action.' });
}
