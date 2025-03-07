export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS", [
      "5e31566f7dca5fb649e7093164c3263d",
      "cd59b47e89f268802801ac3063d70749",
      "f22d02f3b69cd6fbc163c20d6f05131b",
      "57be594b9197ce7d98d223d48764e975",
    ]),
  },
  // Add these security configurations
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "a1c8bf183a38acae7a6bb54f130c8b77"),
    },
  },
  // API token salt
  apiToken: {
    salt: env("API_TOKEN_SALT", "24de336299970efc5ce7c6cd8f6523e5"),
  },
  // JWT configuration for user authentication
  jwt: {
    secret: env("JWT_SECRET", "cce87a6537e4d2cd913af1ac405a0704"),
    expiresIn: "30d",
  },
  // CORS configuration for allowing frontend access
  cors: {
    enabled: true,
    origin: env.array("CORS_ORIGIN", ["http://localhost:5173"]),
    credentials: true,
  },
  // Middleware configuration
  middleware: {
    // Settings for specific middleware
    settings: {
      cors: {
        enabled: true,
      },
    },
  },
});
