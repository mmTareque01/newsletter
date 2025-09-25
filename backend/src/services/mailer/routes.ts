// import { Router } from 'express';
// import { failedMails } from './helper/failedEmails';
// import { sendMailFromGmail } from './sendMailFromGmail';

// const router = Router();

// router.get('/failed-emails', (req, res) => {
//   res.json(failedMails);
// });

// router.post('/send-mail', async (req: any, res: any) => {
//   const { bcc, subject, body } = req.body;

//   if (!bcc || !subject || !body) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     const data = await sendMailFromGmail({ bcc, subject, body });
//     res.json(data);
//   } catch (error: any) {
//     res.status(500).json({ error: 'Failed to send email', details: error.message });
//   }
// });

// export default router;
