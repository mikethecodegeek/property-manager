var express = require('express');
var router = express.Router();
var Property = require('../models/property');


router.get('/', (req,res)=> {

    Property.find((err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(data);
        }

    });
});

router.post('/', (req,res)=> {

    var property = new Property(req.body);
    property.save((err)=> {
        if (err){
            console.log(err);
        } else {
            res.send(property);
        }
    });

});

router.get('/:id', (req,res)=> {
    Property.findById(req.params.id, (err,data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data);
        }
    })
});

router.delete('/:id', (req,res)=> {
    Property.findByIdAndRemove(req.params.id, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});

router.put('/:id', (req,res)=> {
    Property.findByIdAndUpdate(req.params.id,{$set: req.body}, {new:true}, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});

router.post('/feature/:id', (req,res)=> {

     Property.findById(req.params.id,(err, property)=> {
        if (err){
            console.log(err);
        } else {
            property.features.push(req.body.feature);
            client.save((err, tree) => {
                if (err){
                    console.log(err);
                }
                else {
                    res.send(property);
                }
            })

        }
    });

});

module.exports = router;
