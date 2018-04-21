const AHP = require('ahp');
const ahpContext = new AHP();
const mongo = require('./mongodb.js')
const ObjectId = require('mongodb').ObjectID;


// module.exports = {
//     AHPfunction: function () {


function connectToDB() {
    mongo.getOnePLC({_id: ObjectId("5accf1ed06f49620cc87ad9b")}).then((driver) => {
        console.log(driver)
    });

    console.log("tak");
    // setTimeout(function(){console.log(collection)}, 5000)

}

connectToDB()

// ahpContext.addItems() // tutaj wszystkie zaimportowane z bazy danych?
//
// ahpContext.addCriteria(['screen', 'DI', 'DO', 'AI', 'AO', 'IP', 'price', 'lang']) // lista kryteriów ktore biorę pod uwagę
//
// ahpContext.rankCriteriaItem() // dla każdego kryterium ale co dokładnie? Ktory item przewyższa inny w danym kryterium?
//
// ahpContext.rankCriteria() // stosunki kryteriów...ktore są wazniejsze w danym momencie


// let output = ahpContext.run();
// console.log(output);
//     }
// }


// ahpContext.addItems(['VendorA', 'VendorB', 'VendorC']);
//
// ahpContext.addCriteria(['price', 'functionality', 'UX']);
//
// ahpContext.rankCriteriaItem('price', [
//     ['VendorB', 'VendorC', 1 / 2],
//     ['VendorA', 'VendorC', 1 / 2],
//     ['VendorA', 'VendorB', 1]
// ]);
// ahpContext.rankCriteriaItem('functionality', [
//     ['VendorB', 'VendorC', 1],
//     ['VendorA', 'VendorC', 5],
//     ['VendorA', 'VendorB', 5]
// ]);
// ahpContext.rankCriteriaItem('UX', [
//     ['VendorB', 'VendorC', 10],
//     ['VendorA', 'VendorC', 10],
//     ['VendorA', 'VendorB', 1]
// ]);
//
// ahpContext.rankCriteria(
//     [
//         ['price', 'functionality', 3],
//         ['price', 'UX', 3],
//         ['functionality', 'UX', 1]
//     ]
// );
//
// let output = ahpContext.run();
// console.log(output);