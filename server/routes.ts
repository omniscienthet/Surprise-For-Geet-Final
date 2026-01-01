// server/routes.ts
import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth"; // We will create this helper
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes (/api/login, /api/logout, /api/user)
  await setupAuth(app);

  // Your existing API routes would go here if you had any
  // ...

  const httpServer = createServer(app);
  return httpServer;
}
