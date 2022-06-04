import express from "express";
import { addUser } from "../controllers/user";

const router = express.Router();

router.post('/add-user', addUser);