const {defineConfig} = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "<%= default_base_url %>",
    setupNodeEvents(on, config) {
      /**
       * Init base url accorfing to prirority :
       *   1. command line
       *   2. cypress.env.json
       *   3. cypress.config.js
       */
      if (config.baseUrl === config.rawJson?.e2e?.baseUrl) {
        config.baseUrl = config.env?.baseUrl || config.baseUrl;
      }

      return config;
    },
  },
});
