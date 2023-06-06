const express = require("express");
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get("/list", productsController.list);
router.get("/detail", productsController.detail);
router.get("/products/edit", productsController.edit);
router.get("/products/create", productsController.create);

module.exports = router;