import express, { type Request, type Response, type NextFunction } from "express";
import { registerRoutes } from "./routes";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("trust proxy", 1);

function serveStatic(app: express.Express) {
  const distPath = path.join(process.cwd(), "dist", "public");

  if (!fs.existsSync(distPath)) {
    console.error(`Build directory not found at: ${distPath}`);
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

async function setupApp() {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  if (process.env.NODE_ENV === "development") {
    const vite = await import("./vite");
    await vite.setupVite(app, server);
  } else {
    serveStatic(app);
  }

  return app;
}

if (!process.env.VERCEL) {
  setupApp().then((_app) => {
    const PORT = 5000;
    const server = _app.listen(PORT, "0.0.0.0", () => {
      console.log(`serving on port ${PORT}`);
    });
  }).catch((err) => {
    console.error("Failed to start local server:", err);
  });
}

export { app, setupApp };
