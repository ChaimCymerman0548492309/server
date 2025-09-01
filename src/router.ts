import { Router } from "express";
import { Service } from "./service/Service";
import { Controller } from "./controller/controller";

const repo = new Service();
const controller = new Controller(repo);
const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
