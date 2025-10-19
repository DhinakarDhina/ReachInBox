import { Worker } from 'worker_threads';
import { categorizeEmail } from '../services/ai/categorizer';
import { generateSuggestedReplies } from '../services/ai/suggestedReplies';

const aiWorker = new Worker('./src/workers/aiWorker.js');

aiWorker.on('message', async (message) => {
    if (message.type === 'categorize') {
        const { email } = message;
        const category = await categorizeEmail(email);
        aiWorker.postMessage({ type: 'categoryResult', category });
    } else if (message.type === 'suggestReply') {
        const { emailContent } = message;
        const replies = await generateSuggestedReplies(emailContent);
        aiWorker.postMessage({ type: 'replySuggestions', replies });
    }
});

export default aiWorker;