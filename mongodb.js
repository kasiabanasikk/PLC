const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

let connectToDb = function () {
    return new Promise((res, rej) => {
        MongoClient.connect("mongodb://localhost:27017/plcControllers", function (err, db) {
            if (!err) {
                console.log("Connected to DataBase");
                res(db.collection("plc"));

                // getOnePLC(collection, {_id: ObjectId("5accf1ed06f49620cc87ad9b")});
                // getAllPlcs(collection);
                // Search for plc with 4 x DI and DO
                // getPLCsWithCriteria(collection, {DI: 4, DO: 4})
            }
            else {
                throw err;
            }
        })
    });
};

// po ID {_id: ObjectId("5accf1ed06f49620cc87ad9b")}

let getOnePLC = function getOnePLC(id) {
    return new Promise((response, rej) => {
        connectToDb().then(db => {
            db.findOne(id).then((res, rej) => {
                if (res) {
                    response(res);
                }
                if (rej) {
                    console.log(rej)
                }
            })
        })
    });
}

function getAllPlcs(collection) {

    collection.find().toArray().then((res, rej) => {
        if (res) {
            console.log(res)
        }
        if (rej) {
            console.log(rej)
        }
    })
}

function getPLCsWithCriteria(collection, criteria) {

    collection.find(criteria).toArray().then((res, rej) => {
        if (res) {
            console.log(res)
        }

        if (rej) {
            console.log(rej)
        }
    })
}


module.exports = {
    getOnePLC
}