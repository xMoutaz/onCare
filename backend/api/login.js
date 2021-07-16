const express = require("express");

const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const emailExists = await User.findOne({where: {email:email.toLowerCase()} }
        ).catch((err) => {
            console.log("Error: ", err);
        });

        if(!emailExists) return res.status(201).json({message: "Email or Password is not valid!"});

        if(emailExists.password) { 
            if(await emailExists.validPassword(password)){
                const jwtToken = jwt.sign({
                    id: emailExists.id, 
                    email: emailExists.email,
                }, process.env.JWTSECRET);
            return res.json({
                ok:true,
                message: "login successfully!", 
                authToken:jwtToken,
                user: {
                    id: emailExists.id,
                    email: emailExists.email, 
                    fullName: emailExists.fullName}
            });
            } else {
                return res.status(201).json({message: "Email or Password is not valid!"});
            }
            
        }
});

module.exports = router;
