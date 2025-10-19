import { Worker, isMainThread, parentPort } from 'worker_threads';
import { syncEmails } from '../services/email/imapSync';
import { logger } from '../utils/logger';

if (isMainThread) {
    // This file is intended to be run as a worker thread
    logger.error('syncWorker.ts should not be executed directly.');
} else {
    parentPort?.on('message', async (emailAccount) => {
        try {
            await syncEmails(emailAccount);
            parentPort?.postMessage({ status: 'success' });
        } catch (error) {
            logger.error(`Error syncing emails: ${error.message}`);
            parentPort?.postMessage({ status: 'error', error: error.message });
        }
    });
}