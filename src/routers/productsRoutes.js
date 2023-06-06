const express = require("express");
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get("/list", productsController.list);
router.get("/detail", productsController.detail);

module.exports = router;