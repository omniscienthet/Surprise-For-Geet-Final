import express, { type Request, type Response } from "express";
import { registerRoutes } from "./routes";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Vital for Vercel to handle cookies correctly
app.set("trust proxy", 1);

// Helper to log messages (Inlined to avoid importing dev dependencies)
function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

// Helper to serve static files in production (Inlined)
function serveStatic(app: express.Express) {
  const distPath = path.resolve(__dirname, "public");

  if (!fs.existsSync(distPath)) {
    console.error(`Build directory not found at: ${distPath}`);
    // Don't crash here, just log. Vercel might have different structure.
  }

  app.use(express.static(distPath));

  app.use("*", (_req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("Client build not found");
    }
  });
}

// Main initialization function
async function setupApp() {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: any) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    // DYNAMIC IMPORT: This prevents 'vite' from being loaded in production
    const vite = await import("./vite");
    await vite.setupVite(app, server);
  } else {
    serveStatic(app);
  }

  return server;
}

// Only listen on port 5000 if we are NOT on Vercel
if (!process.env.VERCEL) {
  setupApp().then((server) => {
    const PORT = 5000;
    server.listen(PORT, "0.0.0.0", () => {
      log(`serving on port ${PORT}`);
    });
  }).catch((err) => {
    console.error("Failed to start local server:", err);
  });
}

// Export for Vercel
export { app, setupApp };
