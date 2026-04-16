import express from "express";
import path from "path";
import logger from "morgan";
import expressLayouts from "express-ejs-layouts";
import appRouter from "./routes/index.js";
import cors from "cors";
import baseUrlMiddleware from "./middlewares/baseUrl.js";
import setUserMiddleware from "./middlewares/setUser.js";
import notFoundHandler from "./errors/notFoundErrorHandler.js";
import globalErrorHandler from "./errors/globalErrorHandler.js";
import sessionMiddleware from "./middlewares/session.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.set("trust proxy", true);
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.set("layout", "base");

app.use(expressLayouts);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/images", express.static(path.join(process.cwd(), "public/images")));
app.use("/uploads", express.static("uploads"));

app.use(sessionMiddleware());
app.use(setUserMiddleware);
app.use(baseUrlMiddleware);

app.use(appRouter);

app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
