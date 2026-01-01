import { registerRoutes } from "./routes";
import express, { type Request, type Response } from "express";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Trust proxy for Vercel
app.set("trust proxy", 1);

// We export the setup function so Vercel can run it safely
async function setupApp() {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: any) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // On Vercel, this will always be production
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  
  return app;
}

// CRITICAL FIX: Only listen on port 5000 if NOT on Vercel
if (!process.env.VERCEL) {
  (async () => {
    const server = await registerRoutes(app); // Re-init for local dev
    // We duplicate the setup logic here for local dev simplicity
    // or you can call setupApp() but need to handle the return type diff
    app.use((err: any, _req: Request, res: Response, _next: any) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
      throw err;
    });
    
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    const PORT = 5000;
    server.listen(PORT, "0.0.0.0", () => {
      log(`serving on port ${PORT}`);
    });
  })();
}

// Export for Vercel
export { app, setupApp };
