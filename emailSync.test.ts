import request from 'supertest';
import app from '../../src/app'; // Adjust the path as necessary
import { connectToDatabase, disconnectFromDatabase } from '../../src/db/index'; // Adjust the path as necessary

describe('Email Synchronization Integration Tests', () => {
    beforeAll(async () => {
        await connectToDatabase();
    });

    afterAll(async () => {
        await disconnectFromDatabase();
    });

    it('should synchronize emails successfully', async () => {
        const response = await request(app)
            .post('/api/emails/sync') // Adjust the endpoint as necessary
            .send({
                userId: 'testUserId',
                // Add other necessary fields for synchronization
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Emails synchronized successfully');
        // Add more assertions based on the expected response
    });

    it('should return an error for invalid user ID', async () => {
        const response = await request(app)
            .post('/api/emails/sync')
            .send({
                userId: '', // Invalid user ID
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'User ID is required');
    });

    // Add more tests as needed for different scenarios
});