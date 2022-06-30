const { Router } = require("express");
const router = Router();
const auth = require("./../Middlewares/authentication");

const usersController = require("./users.controller");

router.get("/", auth, usersController.get);
router.get("/:id", usersController.getById);
router.post("/", usersController.add);

module.exports = router;