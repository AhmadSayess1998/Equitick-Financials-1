const express = require("express");
const router = express.Router();
const controller = require("../controllers/PostController");

router.get("/", controller.getAll);
router.post("/", controller.getAllPaginate);
router.get("/count", controller.getCount);
router.get("/:id", controller.getbyId);
router.post("/data", controller.post);
router.put("/:id", controller.put);
router.delete("/:id", controller.delete);

module.exports = router;



