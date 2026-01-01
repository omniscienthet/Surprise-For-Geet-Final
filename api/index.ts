import { app, setupApp } from '../dist/index.js';

let isReady = false;

export default async function handler(req, res) {
  if (!isReady) {
    try {
      await setupApp();
      isReady = true;
    } catch (err) {
      console.error("Failed to start server:", err);
      return res.status(500).json({ error: "Server failed to start", details: err.message });
    }
  }
  
  app(req, res);
}
