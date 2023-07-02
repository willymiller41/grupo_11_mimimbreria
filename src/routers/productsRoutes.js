const express = require("express");
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer');
const path = require("path");

//Seteo de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.join(__dirname, "../../public/images"))
    },

    filename: (req, file, cb) =>{
        const newFileName = 'producto_' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName)
    }
})

const upload = multer({ storage })

router.get("/products", productsController.list);
router.get("/products/detail/:id/", productsController.detail);
router.get("/products/edit/:id", productsController.edit);
router.post('/products/edit/:id', upload.single('image'), productsController.storeEdited);
router.get("/products/create/", productsController.create);
router.post("/products/create/", upload.single('image') , productsController.store);
router.get("/products/delete/:id/", productsController.delete);

module.exports = router;


