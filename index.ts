export interface Email {
    id: string;
    subject: string;
    body: string;
    sender: string;
    recipient: string;
    timestamp: Date;
    category?: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SuggestedReply {
    id: string;
    replyText: string;
    emailId: string;
}

export interface Integration {
    id: string;
    type: 'slack' | 'webhook';
    config: Record<string, any>;
}

export interface Config {
    port: number;
    dbUrl: string;
    elasticsearchUrl: string;
    slackWebhookUrl?: string;
}