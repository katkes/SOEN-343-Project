import express from "express";
import apiRoute from './routes/api'
import { SERVER_ART } from "./utils/constants";
import path from 'path'

const app = express();
const PORT = process.env.PORT || 3000;

function initRouteConfig() {
  // Require all requests to be made with JSON Middleware
  app.use(express.json());

  // Register all routes under /api
  app.use("/api", apiRoute);
  
  // Serve React static files
  const reactBuildPath = path.join(__dirname, '..', '..','frontend', 'dist'); // Adjust path as needed
  app.use(express.static(reactBuildPath));

  // Catch-all handler for non-API routes to serve React's index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(reactBuildPath, 'index.html'));
  });
}

initRouteConfig()

// Start the server
app.listen(PORT, () => {
  console.log(SERVER_ART);
  console.log(`Server is running on http://localhost:${PORT}`);
});
