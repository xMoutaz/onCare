const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require('../models/user');
const { response } = require("../app");

router.post("/register", async (req, res) => {
    const {fullName, email, password} = req.body;
    const userExists = await User.findOne({where:{email: email.toLowerCase()}})
    .catch((err) => {
        console.log("Error: ", err);
    });

    if(userExists) {return res.json({message: "User already registered!"})};
    var savedUser;
    if(!userExists){

        const signedUpUser = new User({fullName, email:email.toLowerCase(), password})
        savedUser = await signedUpUser.save()
        .catch((err) => {
            console.log("Error: ", err);
            return  res.json({error: err});
        });    
    }
    

    if(savedUser) {
        return  res.json({message: "user registered successfully!", user: savedUser});
    }
});

module.exports = router;
