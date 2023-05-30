const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "../views/index.html"))
});

app.get("/login", (req, res) =>{
    res.sendFile(path.join(__dirname, "../views/login.html"))
});

app.get("/register", (req, res) =>{
    res.sendFile(path.join(__dirname, "../views/register.html"))
});

app.get("/productcart", (req, res) =>{
    res.sendFile(path.join(__dirname, "../views/productCart.html"))
});

app.get("/nuestrahistoria", (req, res) =>{
    res.sendFile(path.join(__dirname, "../views/nuestraHistoria.html"))
});

app.get("/productdetail", (req, res) =>{
    res.sendFile(path.join(__dirname, "../views/productDetail.html"))
});

app.listen(3000, () =>{
    console.log("Servidor corriendo en el puerto 3000")
})