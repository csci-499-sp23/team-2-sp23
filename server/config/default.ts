export default {
  server: {
    port: process.env.PORT,
  },
  database: {
    production_url: process.env.CONNECTION_URL,
    testing_url: process.env.CONNECTION_URL_TEST,
  },
  api_keys: {
    yelp: process.env.YELP_API_KEY,
  },
};
