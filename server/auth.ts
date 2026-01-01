import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import bcrypt from "bcryptjs";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

export async function setupAuth(app: Express) {
  // Auto-create the specialized GEET user if she doesn't exist
  const existingUser = await storage.getUserByUsername("GEET");
  if (!existingUser) {
    // 10 salt rounds for strong encryption
    const hashedPassword = await bcrypt.hash("@GEET=AAROHI@", 10);
    await storage.createUser({
      username: "GEET",
      password: hashedPassword,
    });
    console.log("Created specialized secure user: GEET");
  }

  app.use(
    session({
      store: storage.sessionStore,
      secret: process.env.SESSION_SECRET || "unsafe-secret",
      resave: false,
      saveUninitialized: false,
      rolling: true, // Refresh session on every request
      cookie: {
        // By default, sessions are temporary (session-only)
        // If the client doesn't explicitly send a "remember me" flag, the browser should clear this when closed.
        maxAge: undefined, 
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user) {
          return done(null, false, { message: "Access Denied: User unknown" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, {
            message: "Access Denied: Wrong credentials",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res
          .status(401)
          .json({ message: info.message ?? "Login failed" });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        
        // If "Stay logged in" is checked, make the cookie permanent (30 days)
        if (req.body.rememberMe) {
          req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
        } else {
          // Otherwise, it stays as a session cookie
          req.session.cookie.maxAge = undefined;
        }
        
        return res.json(user);
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (req.isAuthenticated()) {
      return res.json(req.user);
    }
    res.status(401).json({ message: "Not authenticated" });
  });
}
