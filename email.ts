export interface Email {
    id: string;
    subject: string;
    sender: string;
    recipient: string;
    body: string;
    timestamp: Date;
    isRead: boolean;
    category?: string; // Optional field for AI-based categorization
}