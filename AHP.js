const mongo = require('./mongodb.js');
const ObjectId = require('mongodb').ObjectID;

function testGetOnePlc() {
    mongo.getOnePLC({_id: ObjectId("5accf1ed06f49620cc87ad9b")}).then((driver) => {
        console.log(driver)
    });
}

testGetOnePlc();
