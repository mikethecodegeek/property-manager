var mongoose = require('mongoose');

var clientSchema= mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String},
    phone: {type: String, required: true},
    location: {type: mongoose.Schema.Types.ObjectId, ref: 'Property'}
});
var Client = mongoose.model('Client', clientSchema);
module.exports = Client;


