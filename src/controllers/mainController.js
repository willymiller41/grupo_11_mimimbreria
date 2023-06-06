let mainController = {

    index: function(req, res){
        res.render('index')
    },

    nuestraHistoria: function(req, res){
        res.render('nuestraHistoria')
    }

 };
 
 module.exports = mainController;