const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'App Name Generator API',
      version: '1.1.0',
      description: 'Generate AI-powered names for apps and projects. Includes health check and name generator endpoints.',
    },
    tags: [
      { name: 'Health', description: 'Health check of backend service' },
      { name: 'AI Name Generator', description: 'Endpoints for generating names using AI (OpenAI or stubbed responses).' }
    ],
    servers: [
      { url: 'http://localhost:3000', description: 'Local dev' }
    ]
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
