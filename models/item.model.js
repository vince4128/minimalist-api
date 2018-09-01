const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title:{type:String, unique:true},
    author:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    description:String,
    shortDescription:String,
    date: { type: Date, default: Date.now },
    subitem:[{type: mongoose.Schema.Types.ObjectId, ref: 'Subitem'}],    
    image:String
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;