const ObjectId = require('mongoose').Types.ObjectId;
const Driver = require('./driver.js');

let getOnePLC = function getOnePLC(criteria) {
    return new Promise((response, reject) => {
        return Driver.find(criteria).exec(function (err, driver) {
            if (err) {
                reject(err);
            }

            response(driver);
        })
    });
};


function getAllPlcs() {
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
    getOnePLC({_id: ObjectId("5accf1ed06f49620cc87ad9b")}).then((driver) => {
        console.log(driver)
    });

    // getAllPlcs().then((drivers)=>{
    //     drivers.map((driver) => {
    //         console.log(driver);
    //     });
    // });

    // getOnePLC({DI: 4}).then((driver) => {
    //     console.log(driver)
    // });
}

module.exports = {
    testGetOnePlc: test
};