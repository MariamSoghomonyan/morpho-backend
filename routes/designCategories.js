import { Router } from "express";
import * as controller from "../controllers/designCategories.js";

const router = Router();

router.get("/", controller.listPage);
router.get("/create", controller.createPage);

router.post("/add", controller.add);
router.post("/edit/:id", controller.edit);

router.post("/bulk-delete", controller.bulkDelete);

router.get("/:id/delete", controller.remove);
router.get("/:id", controller.detailPage);

export default router;
