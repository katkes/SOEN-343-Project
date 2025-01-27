import express from "express";
import apiRoute from './routes/api'
import { SERVER_ART } from "./utils/constants";

const app = express();
const PORT = process.env.PORT || 3000;

function initRouteConfig() {
  // Require all requests to be made with JSON Middleware
  app.use(express.json());

  // Register all routes under /api
  app.use("/api", apiRoute);
}

initRouteConfig()

// Start the server
app.listen(PORT, () => {
  console.log(SERVER_ART);
  console.log(`Server is running on http://localhost:${PORT}`);
});
