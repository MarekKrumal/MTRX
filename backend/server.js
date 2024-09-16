import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "/routes/postRoutes.js"

dotenv.config();

connectDB(); //napojeni databaze
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse JSON dat z req.body
app.use(express.urlencoded({ extended: true })); // to parse form dat v req.body
app.use(cookieParser());

//Routes
app.use("/api/users", userRoutes)
app.use("/api/users", postRoutes)

app.use((req, res, next) => {
    res.status(404).send("Route not found");
  });

app.listen(5000, () => console.log(`Server started at http://localhost:${PORT}`));