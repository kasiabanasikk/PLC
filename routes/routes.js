const Ahp = require("../AHP");

const appRouter = function (app) {

    app.get("/driver", function (req, res) {
        Ahp.getDrivers().then(drivers => {
            res.status(200).send(drivers);
        });
    });
};

module.exports = appRouter;