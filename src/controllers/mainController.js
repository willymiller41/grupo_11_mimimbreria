const { log } = require('console');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/product.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController = {

    index: function(req, res){
        res.render('main/index', {products})
    },

    nuestraHistoria: function(req, res){
        res.render('main/nuestraHistoria')
    }

 };
 
 module.exports = mainController;