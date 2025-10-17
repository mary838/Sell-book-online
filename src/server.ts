import express from "express";
import connectDB from "./config/database";
import Router from "@/routes/index";
const app = express();
//Enable json parsing body
app.use(express.json());

//Enable URL-encoded parsing body parsing with extended mode
//`extended : true` allow rich objects and arrays vai query string library
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1", Router);
connectDB();
app.listen(5000, () => {
  console.log(`server run on port 4000`);
});
