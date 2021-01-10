const User = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const signup = (req, res, next) => {
    User.find({email: req.body.email}).then(response => {
        if (response.length === 0) {
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                mobileNo: req.body.mobileNo,
                password: req.body.password
            })
            user.save().then(response => {
                let token = jwt.sign(response, 'GowthamRemover');
                res.status(200).json({
                    message: 'User added successfully',
                    user: response,
                    token: token
                })
            })
        } else {
            res.status(200).json({
                message: 'User already exists'
            })
        }
    });
}

const signin = (req,res,next) => {
    User.find({
        email: req.body.email,
        password: req.body.password
    }).exec().then(response => {
        if (response.length > 0) {
            let token = jwt.sign({response}, 'GowthamRemover');
            res.status(200).json({
                message: 'User found',
                user: response,
                token: token
            });
        }
        else 
        res.status(200).json({
            message: 'User not found',
            user: null
        });
    }).catch(err => {
        console.log(err)
    })
}

module.exports =  {
    signup, signin
}