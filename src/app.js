const express = require('express');
const app = express();
const mainRoutes = require('./routers/mainRoutes');
const usersRoutes = require('./routers/usersRoutes');
const productsRoutes = require('./routers/productsRoutes');
const cartRoutes = require('./routers/cartRoutes');
const session = require('express-session');
const cookie = require('cookie-parser');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.use(cookie());
app.use(userLoggedMiddleware);

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static("public"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', mainRoutes);
app.get('/nuestraHistoria', mainRoutes);

app.get('/login', usersRoutes);
app.post('/login', usersRoutes);
app.get('/register', usersRoutes);
app.post('/register', usersRoutes);
app.get('/profile', usersRoutes);
app.get('/logout', usersRoutes);

app.get('/products', productsRoutes);
app.get('/products/create', productsRoutes);
app.post('/products/create', productsRoutes);
app.get('/products/edit/:id', productsRoutes);
app.post('/products/edit/:id', productsRoutes);
app.get('/products/detail/:id', productsRoutes);
app.get('/products/delete/:id', productsRoutes);

app.get('/carts/cart', cartRoutes);

app.listen('3000', ()=>{
    console.log('Servidor funcionando en el puerto 3000');
})