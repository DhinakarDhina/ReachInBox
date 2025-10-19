import { IncomingWebhook } from '@slack/webhook';
import env from '../../config/env';

const slackClient = new IncomingWebhook(env.SLACK_WEBHOOK_URL);

export const sendSlackNotification = async (channel: string, message: string) => {
    try {
        await slackClient.send({
            channel,
            text: message,
        });
    } catch (error) {
        console.error('Error sending Slack notification:', error);
    }
};