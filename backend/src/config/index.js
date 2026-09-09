/**
 * Centralized application configuration.
 *
 * Loads environment variables from a .env file and provides default values
 * for local development. Other modules should access environment-dependent
 * settings through this configuration instead of reading process.env directly.
 *
 * Supported environment variables:
 * - PORT: Port used by the BFF server.
 * - CORS_ORIGIN: Origin allowed to access the BFF.
 * - DUMMYJSON_BASE_URL: Base URL for the DummyJSON API.
 */

require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  dummyJson: {
    baseUrl: process.env.DUMMYJSON_BASE_URL || 'https://dummyjson.com',
  },
};