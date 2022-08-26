const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/auth.routes");
const crudRoutes = require("./Routes/crud.routes");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
app.set("views", "./views");
app.set("view engine", "pug");
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("server Started on PORT " + PORT);
});

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err.message));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    method: ["GET", "POST", "PUT","OPTIONS"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
app.use("/", crudRoutes);
