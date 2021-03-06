@sg
@ds
@ns
@kn

# coffee-machine
This project includes:
- the smart contract code,
- a single html page,
- and the javascript file to make it work.

This project displays a button to "buy" a coffee, a table with sold coffees and to whom. And the total sales number.
The table refreshes automatically after a sale, but it encounters some delay due to the time the transaction takes to be validated, approx 10-15 seconds.

We tested it ourselves with multiples metamask accounts.

## important ! this project runs on its own already. make sure to run index.html from a localserver in order ot make it work.

### requirements :
#### All you need now is to set up your metamask
install metamask wallet :
https://metamask.io/

copy you meta mask 12 words somewhere if you want to redeploy the contract.
switch to Ropsten test network, you should already have one generated address.
you can generate more addresses if you want to simulate different people using the contract.

get ethers from the testnet :
https://faucet.metamask.io/

request some ethers (multiple times) so you'd have a bank of ether.

:+1: that's it, ready to buy some coffee :+1:

#### For the devs

clone the coffee-machine project :
run **`npm install`**

copy truffle.js.dist (at the root of the projet) and name it truffle.js
config your truffle.js file:
paste your 12 words from metamask into var mnemonic = "[your 12 words]"
you can find it in metamask > parameters > reveal seed words

link to the deployed contract if you want to check that it is the same code in this project :
https://ropsten.etherscan.io/address/0x7A261a89F93e6CEb17eABb280837d6fFB88A106F#code

#### IF YOU WANT TO REDEPLOY CONTRACT :
to use ropsten network on metamask - used to compile and deploy the contract :
run : **`truffle migrate --network ropsten`**
if already deployed once and updated :
run : **`truffle migrate --network ropsten --reset`**

finally, once deployed, copy your contract address and
check on etherscan that your contract is successfully deployed :
https://ropsten.etherscan.io/

#### dependencies :
truffle is solidity development framework used to compile solidity file and deploy the contract.
truffle-hdwallet-provider : library linked metamask and truffle. allow you to use metamask addresses.

