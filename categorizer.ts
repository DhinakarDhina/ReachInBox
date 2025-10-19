import { Email } from '../../models/email';

// Minimal local AIModel stub used for categorization when external module is missing
class AIModel {
    async predictCategory(content: string): Promise<string> {
        const text = (content || '').toLowerCase();
        if (!text) return 'Not Interested';

        if (text.includes('out of office') || text.includes('ooo') || text.includes('out of office reply')) {
            return 'Out of Office';
        }
        if (text.includes('interested') || text.includes('sounds good') || text.includes('i am interested')) {
            return 'Interested';
        }
        if (text.includes('schedule') || text.includes('meeting') || text.includes('book') || text.includes('interview') || text.includes('call')) {
            return 'Meeting Booked';
        }
        if (text.includes('not interested') || text.includes('no thanks') || text.includes('no thanks')) {
            return 'Not Interested';
        }
        if (text.includes('buy now') || text.includes('unsubscribe') || text.includes('spam') || text.includes('promotion')) {
            return 'Spam';
        }

        return 'Interested';
    }
}

export class EmailCategorizer {
    private model: AIModel;

    constructor() {
        this.model = new AIModel();
    }

    public async categorizeEmail(email: Email): Promise<string> {
        const content = email.body || email.subject || '';
        const category = await this.model.predictCategory(content);
        return category;
    }

    public async bulkCategorizeEmails(emails: Email[]): Promise<{ emailId: string; category: string }[]> {
        const categorizedEmails = await Promise.all(
            emails.map(async (email) => {
                const category = await this.categorizeEmail(email);
                return { emailId: String(email.id || ''), category };
            })
        );
        return categorizedEmails;
    }
}