import { Router } from "express";
import * as controller from "../controllers/designPortfolios.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.get("/", controller.listPage);
router.get("/create", controller.createPage);

router.post("/add", upload.array("item_image"), controller.add);

router.post("/edit/:id", upload.array("item_image"), controller.edit);

router.get("/:id/delete", controller.remove);

router.get("/:id", controller.detailPage);

router.post("/bulk-delete", controller.bulkDelete);

export default router;
