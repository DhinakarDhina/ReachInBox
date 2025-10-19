"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationController = void 0;
const slack_1 = require("../../services/integrations/slack");
const webhook_1 = require("../../services/integrations/webhook");
class IntegrationController {
    constructor() {
        this.slackService = new slack_1.SlackService();
        this.webhookService = new webhook_1.WebhookService();
    }
    async handleSlackIntegration(req, res) {
        try {
            const result = await this.slackService.sendNotification(req.body);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: 'Error integrating with Slack', error });
        }
    }
    async handleWebhook(req, res) {
        try {
            const result = await this.webhookService.triggerWebhook(req.body);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: 'Error triggering webhook', error });
        }
    }
}
exports.IntegrationController = IntegrationController;
