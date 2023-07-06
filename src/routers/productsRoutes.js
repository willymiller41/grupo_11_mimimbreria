const express = require("express");
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer');
const path = require("path");
const { body } = require('express-validator');

//Seteo de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.join(__dirname, "../../public/img/products"))
    },

    filename: (req, file, cb) =>{
        const newFileName = 'producto_' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
})

const upload = multer({ storage });

validations = [
    body('name').notEmpty().withMessage('Debe ingresar el nombre del producto'),
    body('description').notEmpty().withMessage('Debe completar la descripción del producto'),
    body('price').notEmpty().withMessage('Debe indicar el precio'),
    body('category').notEmpty().withMessage('Debe indicar una categoría'),
    body('stock').notEmpty().withMessage('Debe indicar el stock'),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        if(!file){
            throw new Error('Debe seleccionar una imagen');
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error('Debe seleccionar una imagen con una extensión válida');
            }else{
                return true;
            }
        }
    })
]

router.get("/products", productsController.list);
router.get("/products/detail/:id/", productsController.detail);
router.get("/products/edit/:id", productsController.edit);
router.post('/products/edit/:id', upload.single('image'), productsController.storeEdited);
router.get("/products/create/", productsController.create);
router.post("/products/create/", upload.single('image'), validations, productsController.store);
router.get("/products/delete/:id/", productsController.delete);

module.exports = router;


