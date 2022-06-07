const express = require('express');
const router = express.Router();
const User = require('../db/model/User');



//Register
router.post('/signup', async (req, res) => {
    //Cogemos la informacion que llega a la peticion a través del body
    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    });
    //guardamos el usuario en la DB si no existe
    const userExists=User.findOne({ email: user.email})
    if(!userExists){
        try {    
            const newUser = await newUser.save();
            res.json(newUser);
            } catch (err) {
                res.json({message: err});
            }
    }else{
            this.router.navigate['signup'];
    }
});


//Login
router.post('/', async (req, res) => {
    //Cogemos la informacion que llega a la peticion a través del body
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
/* TODO Comprobar si existe */
    try {    
        const user = await User.findOne({ email: user.email, password: user.password });
        if(!user){
            this.router.navigate['signup'];
        }else{
            this.router.navigate['lists'];
   }} catch (err) {
        res.json({message: err});
    }

});






module.exports = router;