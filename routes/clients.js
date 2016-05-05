var express = require('express');
var router = express.Router();
var Client = require('../models/client');
var Property = require('../models/property');

router.get('/', (req,res)=> {

    Client.find({})
        .populate('location')
        .exec((err, data) => {
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

router.get('/nohome/client', (req,res)=> {
    Client.find({location: undefined})
        .exec((err,data) => {
        if (err) {
            res.send(err);
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
            client.save((err, tree) => {
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

router.put('/:clientId/moveIn/:propertyId', (req, res) => {

    var clientId = req.params.clientId;
    var propertyId = req.params.propertyId;

    Client.findById(clientId, (err, client) => {
        if(err) return res.status(400).send(err);

        client.location = propertyId;
        Property.findById(propertyId, (err, property) => {
            if (err){
                console.log (err)
            }
            else {
                property.occupants.push(clientId);
                property.save((err, savedUser) => {
                  //  res.status(err ? 400 : 200).send(err);
                });
            }
        });
        client.save((err, savedUser, property) => {
            res.status(err ? 400 : 200).send(err || savedUser);
        });

    });
});

router.put('/:clientId/moveOut/:propertyId', (req, res) => {

    var clientId = req.params.clientId;
    var propertyId = req.params.propertyId;

    Client.findById(clientId, (err, client) => {
        if(err) return res.status(400).send(err);

        Property.findById(propertyId, (err, property) => {
            if (err){
                console.log (err)
            }
            else {
                var ind = property.occupants.indexOf(clientId);
                property.occupants.splice(ind, 1);
              //  property.occupants.push(clientId);
                property.save((err, savedUser) => {
                    //  res.status(err ? 400 : 200).send(err);
                });
            }
        });
        client.location = undefined;

        client.save((err, savedUser) => {
            res.status(err ? 400 : 200).send(err || savedUser);
        });
    });
});



module.exports = router;
