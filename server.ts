import express from 'express';
import { json } from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import routes from './api/routes';
import { connectDB } from './db';
import { loadEnv } from './config/env';
import { logger } from './utils/logger';

const app = express();
const server = createServer(app);
const io = new Server(server);

// Load environment variables
loadEnv();

// Connect to the database
connectDB();

// Middleware
app.use(json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.use('/api', routes);

// Socket.io integration
io.on('connection', (socket) => {
    logger.info('New client connected');
    socket.on('disconnect', () => {
        logger.info('Client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});