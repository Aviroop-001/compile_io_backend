const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const compileRouter = require("./routes/compileRoute");

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", compileRouter);

app.get("/", (req, res) => {
    try {
      res.send("Server is running");
    } catch (error) {
      res.status(404).json("Server is DOWN");
    }
  });

app.listen(PORT, () => {
  console.log("Backend is up and running...");
});
