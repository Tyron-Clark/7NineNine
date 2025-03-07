export default ({ env }) => ({
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET", "eed1cf06a0cdbc12f28c486c73700f80"),
    },
  },
});
