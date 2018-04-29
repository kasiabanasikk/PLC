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

module.exports = {
    getDrivers: getDriverList
};