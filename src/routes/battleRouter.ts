import { Router } from "express"; 
import { starBattle } from "../controllers/battleController";

const router = Router();

router.post('/battle', starBattle);

export default router;