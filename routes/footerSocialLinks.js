import { Router } from "express";
import * as controller from "../controllers/footerSocialLinks.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.get("/", controller.listPage);
router.get("/create", controller.createPage);
router.get("/:id", controller.detailPage);

router.post("/add", upload.single("image"), controller.add);
router.post("/edit/:id", upload.single("image"), controller.edit);

router.get("/:id/delete", controller.remove);
router.post("/bulk-delete", controller.bulkDelete);

export default router;
