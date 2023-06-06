let usersController = {
   
    list: function(req, res){
        res.render('productList')
    },

    detail: function(req, res){
        res.render('productDetail')
    }

 };
 
 module.exports = usersController;