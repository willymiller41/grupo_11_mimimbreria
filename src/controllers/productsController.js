let usersController = {
   
    list: function(req, res){
        res.render('products/productList')
    },

    detail: function(req, res){
        res.render('products/productDetail')
    },

    edit: function(req, res){
        res.render('products/productEdit')
    },
    
    create: function(req, res){
        res.render('products/productCreate')
    }

 };
 
 module.exports = usersController;