import express from "express";
import { addUser, getUser, updateUser } from "../controllers/user.js";

const router = express.Router();

router.post('/register', addUser);

router.get('/', getUser);

router.put('/update-user/:userId', updateUser);

export default router;