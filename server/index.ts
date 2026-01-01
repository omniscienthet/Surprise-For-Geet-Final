import { registerRoutes } from "./routes";
import express, { type Request, type Response } from "express";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Vital for Vercel to handle cookies correctly
app.set("trust proxy", 1);

// Logic to setup the app (routes, middleware, error handlers)
// We export this so the Vercel handler can call it.
async function setupApp() {
  const server = await registerRoutes(app);

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

  return server;
}

// Only start listening on a port if WE ARE NOT ON VERCEL.
// Vercel sets the 'VERCEL' environment variable.
if (!process.env.VERCEL) {
  (async () => {
    const server = await setupApp();
    const PORT = 5000;
    server.listen(PORT, "0.0.0.0", () => {
      log(`serving on port ${PORT}`);
    });
  })();
}

// Export for Vercel
export { app, setupApp };
