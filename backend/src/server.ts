// Route: /backend/server.ts
import express from 'express';
import { ENV_VARS } from './configs/env';
import apiRoute from './routes/api';
import { SERVER_ART } from './configs/constants';
import path from 'path';
import Database from './configs/database';
import { Logger } from './configs/logger';
import { StripeFacade } from './services/stripe/StripeFacade';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { SetupSocket } from './services/socket/socket';

const app = express();

async function initRouteConfig() {
  // Display ascii art
  console.log(SERVER_ART);

  // Connect to MongoDB database
  try {
    Database.getInstance().connect();
  } catch (error) {
    console.error('Error while attempting to connect to database: ', error);
    process.exit(1);
  }

  // Verify Stripe connection
  const stripeFacade = new StripeFacade();
  try {
    await stripeFacade.verifyConnection();
  } catch (error) {
    console.error('Error while attempting to verify Stripe connection: ', error);
    process.exit(1);
  }

  // Require all requests to be made with JSON Middleware
  app.use(express.json());

  // Register all routes under /api
  app.use('/api', apiRoute);

  // Serve React static files
  const reactBuildPath = path.join(__dirname, '..', '..', 'frontend', 'dist'); // Adjust path as needed
  app.use(express.static(reactBuildPath));

  // Catch-all handler for non-API routes to serve React's index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(reactBuildPath, 'index.html'));
  });

  // register socket io before ultimate fall back
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      credentials: true,
    },
  });
  SetupSocket(io);

  // Start the server
  server.listen(ENV_VARS.PORT, () => {
    Logger.info(`Server is running on http://localhost:${ENV_VARS.PORT}`);
  });
}

initRouteConfig();
