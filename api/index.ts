import { app, setupApp } from "../server/index";

export default async function handler(req, res) {
  // Ensure the app is initialized
  await setupApp();
  // Pass the request to Express
  app(req, res);
}
