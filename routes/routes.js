const Ahp = require("../AHP");
const AHP = require('ahp');

const appRouter = function (app) {

    const criteria = ['screen', 'DI', 'DO', 'AI', 'AO', 'price'];

    //default rank criteria matrix contains 1
    const defaultRankCriteria = [];

    for (let i = 0; i < criteria.length - 1; i++) {
        for (let j = i + 1; j < criteria.length; j++) {
            defaultRankCriteria.push({
                key: criteria[i] + "/" + criteria[j],
                value: 1
            });
        }
    }

    app.get("/driver", function (req, res) {
        Ahp.getDrivers().then(drivers => {
            res.status(200).send(drivers);
        });
    });

    const reverseKey = (key) => {
        return key.split("/").reverse().join("/");
    };

    app.post('/run', function (req, res) {
        const drivers = JSON.parse(req.body.drivers.toString());

        const items = [...drivers];

        const rankCriteriaItems = [];

        const rankCriteria = [...defaultRankCriteria];

        criteria.forEach((criterion) => {

            let matrix = [];
            let min = Math.min(...items.map((item) => item[criterion]));
            let max = Math.max(...items.map((item) => item[criterion]));
            let step = Math.abs(min - max) / 9;

            for (let i = 0; i < items.length - 1; i++) {
                for (let j = i + 1; j < items.length; j++) {
                    let a = items[i][criterion];
                    let b = items[j][criterion];
                    // console.log('AB', a, b)
                    let aRank = (Math.abs(a - min) / step) === 0 ? 1 : Math.abs(a - min) / step;
                    let bRank = (Math.abs(b - min) / step) === 0 ? 1 : Math.abs(b - min) / step;
                    // console.log('ABRank', aRank, bRank)
                    matrix.push([items[i]["name"], items[j]["name"], aRank / bRank])
                }
            }

            rankCriteriaItems.push({
                criterion: criterion,
                matrix: matrix
            });

            JSON.parse(req.body.criteriaRankingArray.toString()).forEach((newCriterion) => {
                rankCriteria.forEach((criterion) => {
                    if ((newCriterion.key === criterion.key)) {
                        criterion.value = newCriterion.value;
                    } else if (newCriterion.key === reverseKey(criterion.key)) {
                        criterion.value = 1 / newCriterion.value;
                    }
                })
            });
        });

        const ahpContext = new AHP();

        const names = items.map((item) => item.name);
        ahpContext.addItems(names);
        ahpContext.addCriteria(criteria);
        rankCriteriaItems.forEach(rankCriteriaItem => {
            ahpContext.rankCriteriaItem(rankCriteriaItem.criterion, rankCriteriaItem.matrix);
        });

        const mappedRankCriteria = [];
        rankCriteria.forEach(criterionItem => {
            let record = criterionItem.key.split("/");
            record.push(criterionItem.value);
            mappedRankCriteria.push(record);
        });

        ahpContext.rankCriteria(mappedRankCriteria);

        let result = ahpContext.run();
        res.send(JSON.stringify({
            criteriaRankingArray: result
        }));
    });
};

module.exports = appRouter;

