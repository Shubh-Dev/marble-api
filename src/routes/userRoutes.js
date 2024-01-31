import  express  from "express";
import { getUserByIdController } from "../controllers/userController.js";

console.log("user routes entered")
const router = express.Router();

router.get('/:id', getUserByIdController);

export default router;