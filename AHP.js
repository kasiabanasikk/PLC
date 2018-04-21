const ObjectId = require('mongoose').Types.ObjectId;
const Driver = require('./driver.js');

let getDriver = function getOnePLC(criteria) {
    return new Promise((response, reject) => {
        return Driver.find(criteria).exec(function (err, driver) {
            if (err) {
                reject(err);
            }

            response(driver);
        })
    });
};


function getDriverList() {
    return new Promise((response, reject) => {
        return Driver.find().exec(function (err, drivers) {
            if (err) {
                reject(err);
            }

            response(drivers);
        })
    });
}

function test() {
    getDriver({_id: ObjectId("5accf1ed06f49620cc87ad9b")}).then((driver) => {
        console.log(driver)
    });

    // getDriverList().then((drivers)=>{
    //     drivers.map((driver) => {
    //         console.log(driver);
    //     });
    // });

    // getDriver({DI: 4}).then((driver) => {
    //     console.log(driver)
    // });
}

module.exports = {
    testGetOnePlc: test
};