"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailController = void 0;
const imapSync_1 = require("../services/email/imapSync");
const elasticsearch_1 = require("../services/storage/elasticsearch");
const categorizer_1 = require("../services/ai/categorizer");
const suggestedReplies_1 = require("../services/ai/suggestedReplies");
class EmailController {
    constructor() {
        this.emailService = new imapSync_1.EmailService();
        this.elasticSearchService = new elasticsearch_1.ElasticSearchService();
        this.aiCategorizer = new categorizer_1.AICategorizer();
        this.suggestedReplies = new suggestedReplies_1.SuggestedReplies();
    }
    async fetchEmails(req, res) {
        try {
            const emails = await this.emailService.getEmails();
            res.status(200).json(emails);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching emails', error });
        }
    }
    async categorizeEmail(req, res) {
        try {
            const { emailId } = req.params;
            const email = await this.emailService.getEmailById(emailId);
            const category = await this.aiCategorizer.categorize(email);
            res.status(200).json({ emailId, category });
        }
        catch (error) {
            res.status(500).json({ message: 'Error categorizing email', error });
        }
    }
    async searchEmails(req, res) {
        try {
            const { query } = req.body;
            const results = await this.elasticSearchService.searchEmails(query);
            res.status(200).json(results);
        }
        catch (error) {
            res.status(500).json({ message: 'Error searching emails', error });
        }
    }
    async suggestReplies(req, res) {
        try {
            const { emailContent } = req.body;
            const replies = await this.suggestedReplies.generateReplies(emailContent);
            res.status(200).json(replies);
        }
        catch (error) {
            res.status(500).json({ message: 'Error generating suggested replies', error });
        }
    }
}
exports.EmailController = EmailController;
