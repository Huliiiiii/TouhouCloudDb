import { Router } from "express";
import releaseRouter from "./release/release_router";

const apiRouter = Router();

apiRouter.use("/api", releaseRouter);

export default apiRouter;
