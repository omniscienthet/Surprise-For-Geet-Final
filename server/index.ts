import express, { type Request, type Response, type NextFunction } from "express";
import { registerRoutes } from "./routes";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Vital for Vercel to handle cookies correctly
app.set("trust proxy", 1);

// Helper to log messages
function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

// Helper to serve static files in production
function serveStatic(app: express.Express) {
  // In Vercel, the files are copied to the root task directory + dist/public
  const distPath = path.join(process.cwd(), "dist", "public");

  if (!fs.existsSync(distPath)) {
    console.error(`Build directory not found at: ${distPath}`);
    // Log the current directory tree to help debugging if it fails again
    console.log("CWD:", process.cwd());
    try { console.log("Root files:", fs.readdirSync(process.cwd())); } catch (e) {}
  }

  app.use(express.static(distPath));

  app.use("*", (_req, res) => {
    const indexPath = path.join(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("Client build not found. Did the build finish successfully?");
    }
  });
}

// Main initialization function
async function setupApp() {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // Dynamic import for dev mode prevents Vercel from crashing trying to load 'vite'
  if (process.env.NODE_ENV === "development") {
    const vite = await import("./vite");
    await vite.setupVite(app, server);
  } else {
    serveStatic(app);
  }

  return app;
}

// Only listen on port 5000 if we are NOT on Vercel
if (!process.env.VERCEL) {
  setupApp().then((_app) => {
    const PORT = 5000;
    const server = _app.listen(PORT, "0.0.0.0", () => {
      log(`serving on port ${PORT}`);
    });
  }).catch((err) => {
    console.error("Failed to start local server:", err);
  });
}

// Export for Vercel
export { app, setupApp };
