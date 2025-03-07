export default ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET", "0a6d34ff08a91b20bda69fe3acb9e442"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT", "63136d3a71161a436ab95d11adcb2ea5"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT", "88d0bc6949afdf0cdc006c4f7a41452e"),
    },
  },
  flags: {
    nps: env.bool("FLAG_NPS", true),
    promoteEE: env.bool("FLAG_PROMOTE_EE", true),
  },
});
