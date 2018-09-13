const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subitemSchema = new Schema({
    title:String,
    text:String,
    image:{type: mongoose.Schema.Types.ObjectId, ref: 'Image'}
});

const Subitem = mongoose.model("Subitem", subitemSchema);

module.exports = Subitem;