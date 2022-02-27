const { Router } = require("express");
const controller = require("../controllers/example.controller");
const { authJwt } = require("../middleware/middlewares");

const router = Router();

/**
 * @swagger
 * /api/tasks:
 *  get:
 *    summary: Listamos todos los tasks
 *    tags: [data]
 */
// router.get("/tasks", [authJwt.verifyToken, authJwt.isAdminIn], controller.list);
router.get("/tasks", controller.list);

/**
 * @swagger
 * /api/tasks/:id:
 *  get:
 *    summary: Obtenemos solo un task
 *    tags: [data]
 */
// router.get("/tasks/:id", [authJwt.verifyToken], controller.get);
router.get("/tasks/:id", controller.get);

/**
 * @swagger
 * /api:
 *  post:
 *    summary: Creamos un nuevo task
 *    tags: [data]
 */
router.post("/tasks", controller.create);

/**
 * @swagger
 * /api/:id:
 *  put:
 *    summary: Actualizamos un task
 *    tags: [data]
 */
router.put("/tasks/:id", controller.update);

/**
 * @swagger
 * /api/:id:
 *  delete:
 *    summary: Eliminamos un task
 *    tags: [data]
 */
router.delete("/tasks/:id", controller.delete);

module.exports = router;
