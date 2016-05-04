var mongoose = require('mongoose');

var propertySchema= mongoose.Schema({
    type: {type: String , required: true},
    bedrooms: {type: Number, required: true},
    bathrooms: {type: Number, required: true},
    location: {type: String, required: true},
    price: {type: Number, default: 1000},
    features: [String]
});
var Property = mongoose.model('Property', propertySchema);
module.exports = Property;

