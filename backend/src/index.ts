/*  ========================================================================
    # Backend
    ========================================================================  */

import dotenv from 'dotenv';
import express, {
  type Application as ExpressApplication,
  type Request as ExpressRequest,
  type Response as ExpressRespone,
  type NextFunction as ExpressNextFunction
} from 'express';
import cors from 'cors';
import items from '@/routes/items';

/**
 * Application.
 */
dotenv.config();
const EXPRESS_PORT = process.env.EXPRESS_PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4321';
const app: ExpressApplication = express();
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
);
app.use(express.json());

/**
 * Registering the items routes.
 */
app.use('/items', items);

/**
 * Handles unhandled errors.
 */
app.use((err: Error, _req: ExpressRequest, res: ExpressRespone, _next: ExpressNextFunction) => {
  // biome-ignore lint/suspicious/noConsole: Server logging
  console.error('Internal server error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

/**
 * Handles 404 errors for undefined routes.
 */
app.use('*', (_req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

/**
 * Start the Express server.
 */
app.listen(EXPRESS_PORT, () => {
  // biome-ignore lint/suspicious/noConsole: Server logging
  console.log(`Server is running on port: ${EXPRESS_PORT}`);
});
