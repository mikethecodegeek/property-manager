var mongoose = require('mongoose');

var clientSchema= mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String},
    phone: {type: String, required: true},
    pricerange: {type: Number, required: true},
    location: {type: String, required: true, min: 0, max: 5000},
    features: [String]
});
var Client = mongoose.model('Client', clientSchema);
module.exports = Client;


