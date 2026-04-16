import { Router } from "express";
import * as logoController from "../controllers/logos.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.get("/", logoController.listPage);
router.get("/create", logoController.createPage);

router.post("/add", upload.single("image"), logoController.add);

router.get("/:id", logoController.detailPage);
router.get("/:id/delete", logoController.remove);

router.post("/edit/:id", upload.single("image"), logoController.edit);

router.post("/bulk-delete", logoController.bulkDelete);

export default router;
