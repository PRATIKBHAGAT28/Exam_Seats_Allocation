// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { app } from "./app.js";
dotenv.config;
({
  path: "./env",
});

//db config
connectDB()
  .then((result) => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`server is runnig at port:${process.env.PORT}`, result);
    });
  })
  .catch((err) => {
    console.log("db connection failed", err);
  });
