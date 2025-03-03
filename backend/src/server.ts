import express from 'express';
import { ENV_VARS } from './configs/env';
import apiRoute from './routes/api';
import { SERVER_ART } from './configs/constants';
import path from 'path';
import Database from './configs/database';
import { Logger } from './configs/logger';

const app = express();

async function initRouteConfig() {
  // Display ascii art
  console.log(SERVER_ART);

  try {
    Database.getInstance().connect();
  } catch (error) {
    console.error('Error while attempting to connect to database: ', error);
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
}

initRouteConfig();

// Start the server
app.listen(ENV_VARS.PORT, () => {
  Logger.info(`Server is running on http://localhost:${ENV_VARS.PORT}`);
});
