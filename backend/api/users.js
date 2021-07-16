const express = require("express");
const router = express.Router();
const User = require('../models/user');
const passportJS = require("passport");

router.get("/users" ,async (req, res) => {

    const users = await User.findAll({
        attributes: {
            exclude: ['password']
        }
    })
    .catch((err) => {
            console.log("Error: ", err);
        });

        if(users) {
            return res.json({
                users:users,
            });
        }
});

router.get("/users/:id" ,async (req, res) => {

    const user = await User.findOne({
        where:{id: req.params.id},
        attributes: {
            exclude: ['password']
        }
    })
    .catch((err) => {
            console.log("Error: ", err);
        });

            return res.json({
                user:user
            });
});

router.patch("/users/:id",async (req, res) => {
    const checkEmail = await User.findOne({where:{email: req.body.email.toLowerCase()}})
    .catch((err) => {
        return res.status(404).json({'message':"Couldn't update user's info, try again later!" });
        });
            if(checkEmail && checkEmail.email){
                if( checkEmail.id == req.params.id ) {
                    User.update(
                        {  
                            fullName: req.body.fullName
                        }, 
                    {where:{id: req.params.id}
                    })
                    .then(result => {
                        console.log(result)
                        return res.json({user: {
                            id: req.params.id,
                            email: req.body.email.toLowerCase(),
                            fullName: req.body.fullName,
                        }
                        });
                    })
                    .catch(err => {return res.status(404).json({message: "Couldn't update user's info, try again later!"});});
                } else {
                    return res.status(404).json({message: "Email already in use!"})
                }
            }else {
                User.update(
                    {   email: req.body.email.toLowerCase(),
                        fullName: req.body.fullName
                    }, 
                {where:{id: req.params.id}
                })
                .then(result => {
                    console.log(result)
                    return res.json({user: {
                        id: req.params.id,
                        email: req.body.email.toLowerCase(),
                        fullName: req.body.fullName,
                    }
                    });
                })
                .catch(err => {return res.status(404).json({message: "Couldn't update user's info, try again later!"});});

            }
        })
router.delete("/users/:id",async (req, res) => {

    const user = await User.destroy({where: {id: req.params.id}})
    .catch((err) => {
            console.log("Error: ", err);
        });

            return res.json({
                user:user
            });
});
module.exports = router;
