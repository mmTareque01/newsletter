import { Router } from 'express';
import { inbox } from './inbox';
import { failedMails } from './failedEmails';
import { sendMail } from './sendMail';

const router = Router();

router.get('/emails', (req, res) => {
  res.json(inbox);
});

router.get('/failed-emails', (req, res) => {
  res.json(failedMails);
});

router.post('/send-mail', async (req: any, res: any) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const info = await sendMail({ to, subject, text });
    res.json({ message: 'Email sent' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

export default router;
