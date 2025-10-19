import { Queue } from 'bull';
import { redisClient } from '../config'; // Assuming you have a Redis client configured

const emailQueue = new Queue('emailQueue', {
  redis: redisClient,
});

const aiQueue = new Queue('aiQueue', {
  redis: redisClient,
});

const notificationQueue = new Queue('notificationQueue', {
  redis: redisClient,
});

export { emailQueue, aiQueue, notificationQueue };