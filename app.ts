import express from 'express';
import { json, urlencoded } from 'body-parser';
import { router as emailRoutes } from './api/routes/emails';
import { router as authRoutes } from './api/routes/auth';
import { router as integrationRoutes } from './api/routes/integrations';

const app = express();

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use('/api/emails', emailRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/integrations', integrationRoutes);

export default app;