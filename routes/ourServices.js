import { Router } from "express";
import * as controller from "../controllers/ourServices.js";

const router = Router();

router.get("/", controller.listPage);
router.get("/create", controller.createPage);
router.post("/add", controller.add);
router.post("/bulk-delete", controller.bulkDelete);

router.post("/edit/:id", controller.edit);
router.get("/:id/delete", controller.remove);
router.get("/:id", controller.detailPage);

export default router;
