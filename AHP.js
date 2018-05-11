const Driver = require('./driver.js');


async function getDriverList() {
    return await Driver.find();
}

module.exports = {
    getDrivers: getDriverList
};
