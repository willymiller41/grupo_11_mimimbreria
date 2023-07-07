const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../database/user.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

let usersController = {
   
    login: function(req, res){
      return res.render('users/login');
    },

    processLogin: function(req,res){
      const resultValidation = validationResult(req);
      if(resultValidation.errors.length > 0){
        return res.render(path.join(__dirname, "../views/users/login"), {errors: resultValidation.mapped(), oldData: req.body});
      }
      const userToLogin = users.find(user => user.email === req.body.email);
      if(userToLogin){
        const isPasswordCorrect = bcryptjs.compareSync(req.body.password, userToLogin.password);
        if(isPasswordCorrect){
          delete userToLogin.password;
          req.session.userLogged = userToLogin;
          if(req.body.remember){
            res.cookie('userEmail', req.body.email, {maxAge: (1000 * 60) * 60});
          }
          res.redirect('/profile');
        }else{
        return res.render(path.join(__dirname, "../views/users/login"), {errors: {password:{msg:"Credenciales inválidas"}}, oldData: req.body.email});
        }
      }
    },
    
    register: function(req, res){
      res.render('users/register');
    },

    processRegister: function(req,res){
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
          return res.render(path.join(__dirname, "../views/users/register"), {errors: resultValidation.mapped(), oldData: req.body});
        }
        const userInDb = users.find(user => user.email === req.body.email);
        if(userInDb){
          return res.render(path.join(__dirname, "../views/users/register"), {errors: {email:{msg:"El email ya está registrado"}}, oldData: req.body});
        }
        const userToCreate = {
          id: users[users.length -1].id + 1,
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          code: req.body.code,
          password: bcryptjs.hashSync(req.body.password, 10),
          avatar: req.file.filename,
          role: "user"
        };
        users.push(userToCreate);
        let usersJson = JSON.stringify(users);
        fs.writeFileSync(usersFilePath, usersJson);
    
        return res.redirect("/login");
    },

    profile: function(req, res){
      res.render('users/profile', {
        user: req.session.userLogged
      })
    },

    logout: function(req, res){
      res.clearCookie('userEmail');
      req.session.destroy();
      res.redirect('/');
    }
 };
 
 module.exports = usersController;