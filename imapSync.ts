import Imap from 'imap';
import { simpleParser } from 'mailparser';
import { Email } from '../../models/email';

const saveEmailToDatabase = async (email: Email) => {
    // dynamically load storage module to avoid compile-time export mismatch
    // try common export names: saveEmailToDatabase, default, saveEmail
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const storage: any = require('../storage/elasticsearch');
    if (typeof storage.saveEmailToDatabase === 'function') {
        return storage.saveEmailToDatabase(email);
    }
    if (typeof storage.default === 'function') {
        return storage.default(email);
    }
    if (typeof storage.save === 'function') {
        return storage.save(email);
    }
    throw new Error('No suitable export found in ../storage/elasticsearch to save emails');
};

const IMAP_CONFIG: Imap.Config = {
    user: process.env.EMAIL_USER || '',
    password: process.env.EMAIL_PASSWORD || '',
    host: process.env.IMAP_HOST || '',
    port: 993,
    tls: true,
};

export const syncEmails = () => {
    const client = new Imap(IMAP_CONFIG);

    client.once('ready', () => {
        client.openBox('INBOX', false, (err, box) => {
            if (err) throw err;

            client.on('mail', (numNewMail: number) => {
                client.search(['UNSEEN'], (err, results: number[]) => {
                    if (err) throw err;
                    if (!results || results.length === 0) return;

                    const fetcher = client.fetch(results, { bodies: '', markSeen: false });

                    fetcher.on('message', (msg, seqno) => {
                        let uid: number | string = seqno;

                        // capture attributes (to get uid)
                        msg.on('attributes', (attrs) => {
                            if (attrs && attrs.uid) uid = attrs.uid;
                        });

                        msg.on('body', async (stream) => {
                            try {
                                const parsed = await simpleParser(stream);

                                const emailData = {
                                    id: String(uid),
                                    subject: parsed.subject || '',
                                    from: parsed.from ? (Array.isArray(parsed.from) ? parsed.from.map(f => f.text || '').join(', ') : parsed.from.text || '') : '',
                                    to: parsed.to ? (Array.isArray(parsed.to) ? parsed.to.map(t => t.text || '').join(', ') : parsed.to.text || '') : '',
                                    date: parsed.date || new Date(),
                                    body: parsed.text || '',
                                    html: parsed.html || '',
                                } as unknown as Email;

                                await saveEmailToDatabase(emailData);
                            } catch (parseErr) {
                                // minimal error handling - replace with logger as needed
                                console.error('Failed to parse/fetch email body', parseErr);
                            }
                        });

                        msg.once('end', () => {
                            // message finished
                        });
                    });

                    fetcher.once('error', (fetchErr) => {
                        console.error('Fetch error: ', fetchErr);
                    });

                    fetcher.once('end', () => {
                        // fetch finished
                    });
                });
            });
        });
    });

    client.once('error', (err: any) => {
        console.error('IMAP client error:', err);
    });

    client.connect();
};

export default syncEmails;