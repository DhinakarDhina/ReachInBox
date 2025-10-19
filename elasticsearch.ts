import { Client } from '@elastic/elasticsearch';
import { Email } from '../../models/email';

const client = new Client({ node: process.env.ELASTICSEARCH_URL });

export const indexEmail = async (email: Email) => {
    await client.index({
        index: 'emails',
        id: email.id,
        body: {
            subject: email.subject,
            body: email.body,
            sender: email.sender,
            recipient: email.recipient,
            timestamp: email.timestamp,
        },
    });
};

export const searchEmails = async (query: string) => {
    const result = await client.search({
        index: 'emails',
        body: {
            query: {
                multi_match: {
                    query,
                    fields: ['subject', 'body', 'sender', 'recipient'],
                },
            },
        },
    } as any);
    return (result.hits?.hits ?? []).map((hit: any) => hit._source);
};