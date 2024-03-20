import express from "express";
import * as listController from "controllers/list";
import * as apiController from "controllers/api";
import * as authController from "controllers/auth";
const router = express.Router();

/**
 * @api {get} /list/albums 专辑展示界面
 * @apiName listAlbums
 * @apiGroup list
 * @apiVersion  1.0.0
 * @apiSuccess (200) {type} name description
 * @apiParamExample  {type} Request-Example:
 * {
 *     property : value
 * }
 * @apiSuccessExample {type} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     property : value
 * }
 */
router.get("/list/albums", listController.listAlbums);

/**
 * @api {get} /list/songs 歌曲展示页面
 * @apiName listSongs
 * @apiGroup list
 * @apiVersion  1.0.0
 * @apiSuccess (200) {type} name description
 * @apiSuccessExample {type} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     property : value
 * }
 */
router.get("/list/songs", listController.listSongs);

// auth
router.post("/api/login", authController.login);
router.post("/api/register", authController.register);
router.post("/api/checkUsername", authController.checkUsername);

router.get("/api", apiController.GET);
router.post("/edit/song", apiController.postSong);
export default router;