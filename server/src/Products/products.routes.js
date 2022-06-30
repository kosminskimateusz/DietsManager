const { Router } = require("express");
const router = Router();
const Logger = require("../Middlewares/logger");

const productsController = require('./products.controller');

router.get("/", productsController.get);
router.get("/:id", productsController.getById);
router.post("/", productsController.add);
router.put("/:id", productsController.update);
router.delete("/:id", productsController.remove);



module.exports = router;