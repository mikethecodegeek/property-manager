var mongoose = require('mongoose');

var treeSchema= mongoose.Schema({
    species: {type: String , required: true},
    age: {type: Number, required: true, min: 0, max: 10000},
    createdAt: {type: Date, default: Date.now},
    creatures: [String]
});
var Tree = mongoose.model('Tree', treeSchema);
module.exports = Tree;


