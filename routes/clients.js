var express = require('express');
var router = express.Router();
var Client = require('../models/client');


router.get('/', (req,res)=> {

    Client.find((err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(data);
        }

    });
});

router.post('/', (req,res)=> {

    var client = new Client(req.body);
    client.save((err)=> {
        if (err){
            console.log(err);
        } else {
            res.send(client);
        }
    });

});

router.get('/:id', (req,res)=> {
    Client.findById(req.params.id, (err,data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data);
        }
    })
});

router.delete('/:id', (req,res)=> {
    Client.findByIdAndRemove(req.params.id, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});

router.put('/:id', (req,res)=> {
    Client.findByIdAndUpdate(req.params.id,{$set: req.body}, {new:true}, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});

router.post('/feature/:id', (req,res)=> {

    Client.findById(req.params.id,(err, client)=> {
        if (err){
            console.log(err);
        } else {
            client.features.push(req.body.feature);
            tree.save((err, tree) => {
                if (err){
                    console.log(err);
                }
                else {
                    res.send(client);
                }
            })

        }
    });

});

module.exports = router;
