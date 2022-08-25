const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/auth.routes");
const crudRoutes = require("./Routes/crud.routes");
const app = express();
const cookieParser = require("cookie-parser");
require('dotenv').config()

app.listen(4000, () => {
  console.log("server Started on PORT 4000");
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
    method: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
// app.use("/ty-api", createProxyMiddleware({
//   target: "http://localhost:4000",
//   changeOrigin: true,
//   onProxyRes: function (proxyRes, req, res) {
//     proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//   }
// }))
app.use("/", authRoutes);
app.use("/", crudRoutes);
