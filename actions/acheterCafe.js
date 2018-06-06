/*
* Acheter un café
* utiliser la commande 'truffle exec helpers/acheterCafe.js --network [network]'
*/

var contract = "MachineCafe";
var Contract = artifacts.require(contract);

module.exports = function(callback) {
    Contract.deployed().then(function(instance) {

        return instance.acheterCafe({value: web3.toWei("2", "finney")});

    }).then(function(res) {
        console.log(res);
        console.log(res.logs.forEach(log => {
            console.log("Log args for " + log);
            console.log(log.args)
        }));
    }).catch(function(err) {
        console.log(err);
    });
};