import { Router } from "express";
import { ItemController } from "./controller";
import { JsonRepository } from "./repository";

const repo = new JsonRepository();
const controller = new ItemController(repo);
const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
