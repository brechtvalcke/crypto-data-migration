const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

const RawPriceSchema = new Schema({
    datetime: {
        type: Date,
        required: true
    },
    usdPrice: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

// Set the name of the collection
RawPriceSchema.set("collection", "rawCacheSchema");
module.exports = mongoose.model("Cache", RawPriceSchema);
