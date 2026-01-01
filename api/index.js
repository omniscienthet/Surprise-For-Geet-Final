// Import the built app from the dist folder
import { app, setupApp } from '../dist/index.js';

// Lazy initialization flag
let isReady = false;

export default async function handler(req, res) {
  if (!isReady) {
    // Initialize routes and middleware once
    await setupApp();
    isReady = true;
  }
  
  // Pass the request to Express
  app(req, res);
}
