const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const fileupload = require("express-fileupload");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();
const { UserRoutes, ProductRoutes, docRoutes } = require("./routes");
const { swaggerSpec, swaggerJson } = require("./docs");

const app = express();
const port = process.env.PORT || 2000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("uploads"));
app.use(
  fileupload({
    createParentPath: true,
  })
);

app.get("/", async (req, res) => {
  res.json({
    App: "Sayur App Backend",
    Version: "0.0.0",
    Massage: "Not Seriously project but worth it",
  });
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use("/auth", UserRoutes);
app.use("/product", ProductRoutes);

//error handling
app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  res.json({
    code: error.status ? error.status : 500,
    message: error.message,
    data: false,
  });
});

app.listen(port, () => {
  console.log(`Magic at http://localhost:${port}`);
});
