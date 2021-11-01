require("dotenv").config();

module.exports = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_BACKEND_URL: process.env.NEXTAUTH_BACKEND_URL,
    NEXTAUTH_BACKEND_PRODUCTION_URL:
      process.env.NEXTAUTH_BACKEND_PRODUCTION_URL,
  },
};
