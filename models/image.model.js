const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subitemSchema = new Schema({
    title:String,
    date: { type: Date, default: Date.now }
});

const Subitem = mongoose.model("Subitem", subitemSchema);

module.exports = Subitem;