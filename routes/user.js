import express from "express";
import ROLE from "../config/role.js";
import { addUser, deleteUser, getUser, updateUser } from "../controllers/user.js";
import { authRole, verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post('/register',verifyToken, authRole(ROLE.ADMIN), addUser);

router.get('/', getUser);

router.put('/update-user/:userId', verifyToken, authRole(ROLE.USER), updateUser);

router.delete('/delete-user/:userId', verifyToken, authRole(ROLE.ADMIN), deleteUser);

export default router;