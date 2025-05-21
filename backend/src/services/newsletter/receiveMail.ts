import { SMTPServer, SMTPServerSession, SMTPServerDataStream } from 'smtp-server';
import { simpleParser, ParsedMail } from 'mailparser';
import { addMail, Mail } from './inbox';

export function startSmtpServer(port = 2525): void {
  const server = new SMTPServer({
    authOptional: true,
    onData(stream: SMTPServerDataStream, session: SMTPServerSession, callback: (err?: Error) => void) {
      simpleParser(stream)
        .then((parsed: ParsedMail) => {
          const mail: Mail = {
            from: parsed.from?.text || 'Unknown',
            subject: parsed.subject || '(No Subject)',
            body: parsed.text || '',
            date: new Date(),
          };

          addMail(mail);
          callback();
        })
        .catch((err: Error) => {
          console.error('Failed to parse:', err);
          callback(err);
        });
    }
  });

  server.listen(port, () => {
    console.log(`SMTP server running on port ${port}`);
  });
}
