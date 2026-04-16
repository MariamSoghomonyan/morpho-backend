import { Router } from "express";
import * as langController from "../controllers/langs.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.get("/", langController.listPage);
router.get("/create", langController.createPage);
router.get("/:id", langController.detailPage);
router.get("/:id/delete", langController.remove);

router.post("/add", upload.single("flag"), langController.add);
router.post("/edit/:id", upload.single("flag"), langController.edit);

router.post("/bulk-delete", langController.bulkDelete);
export default router;
