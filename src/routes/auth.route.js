const { Router } = require("express");
const controller = require("../controllers/auth.controller");
const { verify } = require("../middleware/middlewares");
const router = Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/auth/signup", verify, controller.signUp);
router.post("/auth/signin", controller.signIn);

module.exports = router;
