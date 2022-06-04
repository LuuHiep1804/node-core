import express from "express";
import { initHttpMiddleware } from "./middleware/http.js";
import { connectDB } from "./database.js";

const app = express();
const PORT = 8080;
const URI = 'mongodb://localhost:27017/fetch-project-training';

connectDB();
initHttpMiddleware(app);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});