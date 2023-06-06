let mainController = {

    index: function(req, res){
        res.render('main/index')
    },

    nuestraHistoria: function(req, res){
        res.render('main/nuestraHistoria')
    }

 };
 
 module.exports = mainController;