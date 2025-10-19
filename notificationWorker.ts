import { Worker } from 'worker_threads';
import { sendNotification } from '../services/integrations/slack';
import { triggerWebhook } from '../services/integrations/webhook';

const notificationWorker = new Worker('./src/workers/notificationWorker.js');

notificationWorker.on('message', async (message) => {
    const { type, payload } = message;

    switch (type) {
        case 'slack':
            await sendNotification(payload);
            break;
        case 'webhook':
            await triggerWebhook(payload);
            break;
        default:
            console.error('Unknown notification type:', type);
    }
});

export default notificationWorker;