/**
 * Configuration object for the application.
 * 
 * @property {string} baseAPIUrl - The base URL for the API. 
 * It is retrieved from the environment variable `BASE_API_URL` if available, 
 * otherwise defaults to "http://localhost:4002".
 */
const appConfig = {
  baseAPIUrl: import.meta.env.BASE_API_URL || "http://localhost:4002",
};

export default appConfig;
