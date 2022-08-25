const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/auth.routes");
const crudRoutes = require("./Routes/crud.routes");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("server Started on PORT " + PORT);
});

mongoose
  .connect(
    "mongodb+srv://halituzan:3035035169Hu.@cluster0.xm8zxmu.mongodb.net/jwt",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err.message));

app.use(cors());

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
