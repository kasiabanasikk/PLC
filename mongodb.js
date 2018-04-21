const MongoClient = require('mongodb').MongoClient;

let connectToDb = function () {
    return new Promise((res, rej) => {
        MongoClient.connect("mongodb://localhost:27017/plcControllers", function (err, db) {
            if (!err) {
                console.log("Connected to DataBase");
                res(db.collection("plc"));
            }
            else {
                rej(err);
                throw err;
            }
        })
    });
};

let getOnePLC = function getOnePLC(id) {
    return new Promise((response, reject) => {
        connectToDb().then(db => {
            db.findOne(id).then((res, rej) => {
                if (res) {
                    response(res);
                }
                if (rej) {
                    reject(rej)
                }
            })
        })
    });
};

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
};