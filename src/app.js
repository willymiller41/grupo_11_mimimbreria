const express = require('express');
const app = express();
const mainRoutes = require('./routers/mainRoutes');
const usersRoutes = require('./routers/usersRoutes');
const productsRoutes = require('./routers/productsRoutes');
const cartRoutes = require('./routers/cartRoutes');

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static("public"));

app.get('/', mainRoutes);
app.get('/nuestraHistoria', mainRoutes);

app.get('/login', usersRoutes);
app.get('/users/register', usersRoutes);

app.get('/list', productsRoutes);
app.get('/detail', productsRoutes);
app.get('/products/edit', productsRoutes);
app.get('/products/create', productsRoutes);

app.get('/carts/cart', cartRoutes);

app.listen('3000', ()=>{
    console.log('Servidor funcionando en el puerto 3000');
})