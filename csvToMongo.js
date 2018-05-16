const fs = require("fs");
const path = require("path");
const csvReader = require("csv-reader");
const mongoose = require("mongoose");

const RawPriceModel = require("./models/rawPrice");
const helpers = require("./helpers");

// Connect to db
mongoose.connect("mongodb://127.0.0.1:27017/cryptoAI", {
    useMongoClient: true
});

const currentFileIndex = 0;
const dataFiles = helpers.getDataFileNames();

function mapCSVLine(arr) {
    return {
        datetime: new Date(arr[0]),
        usdPrice: arr[1],
        type: arr[2]
    };
}

function getNewPeriod(beginDate) {
    const endDate = new Date(beginDate).setSeconds(beginDate.getSeconds() + 30);

    return {
        start: beginDate,
        end: endDate,
        items: [],
    };
}

// function savePeriod(period) {
    
// }

function runMigratioOnFile(file, prevPeriod, rest) {
    const inputStream = fs.createReadStream(file, "utf8");

    let period;

    inputStream
        .pipe(csvReader({ parseNumbers: true, parseBooleans: true, trim: true }))
        .on('data', function(row) {

            RawPriceModel.create(mapCSVLine(row))
                .catch(function(err) {
                    console.log(err);
                })

            // const item = mapCSVLine(row);

            // if (!period) {
            //     period = getNewPeriod(item.date);
            // }

            // if (row.date.toISOString() < period.endDate.toISOString()) {
            //     period.items.push(item);
            //     return;
            // }

            // savePeriod(period);
            // period = null;
        })
        .on('end', function(data) {
            console.log("done");
        });
}

runMigratioOnFile(dataFiles[currentFileIndex]);



