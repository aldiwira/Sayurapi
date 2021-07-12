const swaggerJSDoc = require("swagger-jsdoc");
const swaggerJson = require("./swagger.json");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Sayur app backend",
    version: "1.0.0",
    description: "Yahh begitulah",
  },
  servers: [
    {
      url: "http://localhost:2000",
      description: "Development server",
    },
    {
      url: "commingsoon",
      description: "Production server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerJson };
