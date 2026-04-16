import { Router } from "express";
import * as controller from "../controllers/smmProcess.js";

const router = Router();

router.get("/", controller.listPage);
router.get("/create", controller.createPage);
router.post("/add", controller.add);

router.post("/bulk-delete", controller.bulkDelete);

router.get("/:id", controller.detailPage);
router.post("/edit/:id", controller.edit);
router.get("/:id/delete", controller.remove);

export default router;
