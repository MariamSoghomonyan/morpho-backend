import { Router } from "express";
import * as controller from "../controllers/videos.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.get("/", controller.listPage);
router.get("/create", controller.createPage);
router.get("/:id", controller.detailPage);

router.post(
  "/add",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  controller.add,
);

router.post(
  "/edit/:id",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  controller.edit,
);

router.post("/bulk-delete", controller.bulkDelete);

export default router;
