const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

const PeriodSchema = new Schema({
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true
    },
    percentageGain: {
        type: Number,
        required: true
    },
    avgUsdPrice: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    items: [{
        type: Mixed
    }]
});

// Set the name of the collection
PeriodSchema.set("collection", "period");
module.exports = mongoose.model("Period", PeriodSchema);
