$(async function () {

    // Initialization
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/05S6w0olOOZQ71AtEDwr"));
    }

    var address = "0x7A261a89F93e6CEb17eABb280837d6fFB88A106F";
    var Contract = web3.eth.contract(abi);
    var contract = Contract.at(address);
    var button = $("#buy");
    var list = $("#sales");
    var total = $("#total");

    var buyers = localStorage.getItem("buyers");

    if (!buyers) {
        localStorage.setItem("buyers", JSON.stringify([]));
    }
    buyers = localStorage.getItem("buyers");

    // Functions
    const promisify = (inner) =>
        new Promise((resolve, reject) =>
            inner((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        );

    const displayBuyers = (buyers) => {
        list.empty();
        buyers.forEach((element, index) => {
            list.append('<tr><td>' + index + '</td><td>' + element + '</td></tr>')
        });
    };

    const refreshList = async () => {
        var totalSales = parseInt(await promisify(cb => contract.totalVendu(cb)));
        let promises = [];

        for(let i = 0; i < totalSales; i++) {
            let promise = promisify(cb => contract.ownerOf(i, cb));
            promises.push(promise);
        }

        Promise.all(promises).then(values => {
            displayBuyers(values);
            localStorage.setItem("buyers", JSON.stringify(values));
            total.html(values.length);
        });
    };

    const buyCoffee = () => {
        var transactionObject = {from: web3.eth.defaultAccount, value: price};
        promisify(cb => contract.acheterCafe.sendTransaction(transactionObject, cb))
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    };

    // Execution
    displayBuyers(JSON.parse(buyers));

    var price = parseInt(await promisify(cb => contract.prix(cb)));
    button.on('click', buyCoffee);

    refreshList();
    // Regresh list every 5 seconds
    setInterval(refreshList, 5000);
});