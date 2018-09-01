const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subitemSchema = new Schema({
    title:String,
    text:String,
    image:String
});

const Subitem = mongoose.model("Subitem", subitemSchema);

module.exports = Subitem;