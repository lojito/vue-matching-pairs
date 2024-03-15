import { Router } from "express";
const router = Router();

import { getGames, createGame, removeGame } from "../controllers/games";

router.get("/", getGames);

router.post("/", createGame);

router.delete("/", removeGame);

export default router;
