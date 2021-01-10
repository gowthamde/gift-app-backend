const Gift = require('../models/gift');
const mongoose = require('mongoose');

exports.update_gifts = (req, res, next) => {
    let quantity = null;
    const query = {
        _id: req.params.id
    }
    Gift.findById(req.params.id).exec().then(result =>{
        quantity = result.quantity;
        quantity = quantity - 1;
        Gift.updateOne(query, {
            quantity: quantity
        }).then(result => {
            res.status(200).json({
                message: result
            })
        })
    });
}

exports.create_gift = (req, res, next) => {
    const gift = new Gift({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        noOfItemsSold: req.body.noOfItemsSold,
        occasion: req.body.occasion,
        matchFor: req.body.matchFor,
        imageName: req.body.imageName,
        image: req.body.image
    });
    gift.save().then(result => {
        res.status(200).json({
            message: 'gift added successfully.'
        })
    }).catch(err => {
        res.status(500).json({
            message: 'internal server error'
        })
    })
}

exports.getall_gifts = (req, res, next) => {
    Gift.find({
        quantity : { $gt: 0}
    }).exec().then(result => {
        res.status(200).json({
            message: 'fetched successfully.',
            items: result
        })
    }).catch(err => {
        res.status(500).json({
            message: err
        })
    })
}

exports.gettop_gifts = (req, res, next) => {
    Gift.find({
        quantity : { $gt: 0}
    }).limit(5).exec().then(result => {
        res.status(200).json({
            message: 'fetched successfully.',
            items: result
        })
    }).catch(err => {
        res.status(500).json({
            message: err
        })
    })
}

exports.getbyid_gift = (req, res, next) => {
    Gift.findById(req.params.id).exec().then(result => {
        res.status(200).json({
            items: [result]
        })
    }).catch(err => {
        res.status(500).json({
            message: 'internal server error'
        })
    })
}