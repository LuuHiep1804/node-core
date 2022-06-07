import express from "express";
import { addUser, deleteUser, getUser, updateUser } from "../controllers/user.js";

const router = express.Router();

router.post('/register', addUser);

router.get('/', getUser);

router.put('/update-user/:userId', updateUser);

router.delete('/delete-user/:userId', deleteUser);

export default router;