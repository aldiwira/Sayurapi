const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 2000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", async (req, res) => {
  res.json({
    App: "Sayur App Backend",
    Version: "0.0.0",
    Massage: "Not Seriously project but worth it",
  });
});

app.listen(port, () => {
  console.log(`Magic at http://localhost:${port}`);
});
