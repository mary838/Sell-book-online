import express from "express";
import connectDB from "@/config/database";
import Router from "@/routes/index";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.use("/api/v1", Router);
// connectDB();
// app.listen(5000, () => {
//   console.log(`server run on port 4000`);
// Root route — shows message when visiting http://localhost:4000
// app.get("/", (req, res) => {
//   res.send("Server is running on port 4000 🚀");
// });

app.use("/api", Router);

connectDB()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection failed:", err));

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:4000");
});
