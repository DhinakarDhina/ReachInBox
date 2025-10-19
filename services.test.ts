import { EmailService } from '../../src/services/email/imapSync';
import { ElasticsearchService } from '../../src/services/storage/elasticsearch';
import { CategorizerService } from '../../src/services/ai/categorizer';
import { SuggestedRepliesService } from '../../src/services/ai/suggestedReplies';

describe('Email Service', () => {
    it('should synchronize emails correctly', async () => {
        const result = await EmailService.syncEmails();
        expect(result).toBeDefined();
        expect(result).toHaveProperty('emails');
    });
});

describe('Elasticsearch Service', () => {
    it('should index emails correctly', async () => {
        const emailData = { subject: 'Test Email', body: 'This is a test email.' };
        const result = await ElasticsearchService.indexEmail(emailData);
        expect(result).toBeTruthy();
    });

    it('should search emails correctly', async () => {
        const result = await ElasticsearchService.searchEmails('Test');
        expect(result).toBeDefined();
        expect(result.hits.total).toBeGreaterThan(0);
    });
});

describe('AI Categorizer Service', () => {
    it('should categorize emails correctly', async () => {
        const emailContent = 'This is a test email about your account.';
        const category = await CategorizerService.categorize(emailContent);
        expect(category).toBeDefined();
        expect(['Account', 'Promotion', 'Social']).toContain(category);
    });
});

describe('Suggested Replies Service', () => {
    it('should generate suggested replies', async () => {
        const emailContent = 'I need help with my order.';
        const suggestions = await SuggestedRepliesService.generateSuggestions(emailContent);
        expect(suggestions).toBeDefined();
        expect(suggestions.length).toBeGreaterThan(0);
    });
});