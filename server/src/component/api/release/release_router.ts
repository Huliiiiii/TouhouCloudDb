import { Router } from "express";
import { getReleaseDataController } from "./release_api_controller";

const releaseRouter = Router();

releaseRouter.get("/release", getReleaseDataController);

export default releaseRouter;
