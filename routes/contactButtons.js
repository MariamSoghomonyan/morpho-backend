import { Router } from "express";
import * as controller from "../controllers/contactButtons.js";

const router = Router();

router.get("/", controller.listPage);
router.get("/create", controller.createPage);
router.get("/:id", controller.detailPage);
router.get("/:id/delete", controller.remove);

router.post("/add", controller.add);
router.post("/edit/:id", controller.edit);
router.post("/bulk-delete", controller.bulkDelete);
export default router;
