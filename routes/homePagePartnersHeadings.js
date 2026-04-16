import { Router } from "express";
import * as controller from "../controllers/homePagePartnersHeadings.js";

const router = Router();

router.get("/", controller.listPage);
router.get("/create", controller.createPage);
router.get("/:id", controller.detailPage);

router.post("/add", controller.add);
router.post("/edit/:id", controller.edit);

router.get("/:id/delete", controller.remove);
router.post("/bulk-delete", controller.bulkDelete);

export default router;
