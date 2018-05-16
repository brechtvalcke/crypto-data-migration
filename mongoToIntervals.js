const mongoose = require("mongoose");

const RawPriceModel = require("./models/rawPrice");
const helpers = require("./helpers");

// Connect to db
mongoose.connect("mongodb://127.0.0.1:27017/cryptoAI", {
    useMongoClient: true
});

function mapStep(prevItem, currItem) {

}

function skippedSteps(prevItem, currItem) {

};

function fillSkippedSteps(prevItem, currItem) {

}

RawPriceModel.aggregate([
    {
        "$group": {
            "_id": {
                "$add": [
                    {
                        "$subtract": [
                            { "$subtract": ["$datetime", new Date(0)] },
                            {
                                "$mod": [
                                    { "$subtract": ["$datetime", new Date(0)] },
                                    1000 * 30
                                ]
                            }
                        ]
                    },
                    new Date(0)
                ]
            },
            "items": { $push: { datetime: "$datetime", usdPrice: "$usdPrice" } },
            "count": { "$sum": 1 }
        }
    },
    {
        "$sort": { "_id": 1 }
    }
]).then((result) => {
    let prevItem;

    result.forEach((item) => {
        let skippedSteps = [];
        let lastSkippedStep = null;

        if(skippedSteps(prevItem, item)) {
            skippedSteps = fillSkippedSteps(prevItem, item);
            lastSkippedStep = skippedSteps.slice(-1)[0];
        }

        const currMappedStep = mapStep(item, lastSkippedStep || prevItem);

        saveSteps(item, currMappedStep);

        prevItem = item;
    });
}).catch((err) => {
    console.log(err);
})