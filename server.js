import express from "express";
import { connectDB } from "./database.js";
import { initHttpMiddleware } from "./middleware/http.js";
import { login } from "./controllers/auth.js";
import user from "./routes/user.js";

const app = express();
const PORT = 3030;

connectDB();
initHttpMiddleware(app);

app.post('/login', login);

app.use('/api/user/', user);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});