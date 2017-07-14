# SwissBorg Cyborg Index (SBCI Token)

version : 0.2

[![Logo](doc/image/logo.png)](https://www.swissborg.com/)


## Introduction

This package contains Ethereum Solidity smart contracts to manage the workflow of SBCI token.
It cam be use to create, transfer, withdraw SBCI token, this token implements the core [ERC20](https://github.com/ethereum/EIPs/issues/20) standard functionality.

## Interacting with SBCI smart contract

You can interact with SBCI smart contract using :
1. MyEtherWallet (Choose Node Rinkeby)
2. Parity
3. Metamask
4. Mist
5. IMTOKEN

**DO NOT USE AN EXCHANGE WALLET**

#### The Rinbeky demo of the SBCI smart contract can be access : [https://rinkeby.etherscan.io/token-search](https://rinkeby.etherscan.io/token-search)
* **smart contract address :**  0xe72cbdff0ed70899c6e33ccf921b8506dcedc965
* **ABI :** [Rinbeky](doc/Rinbeky-ABI.txt)

#### The production ready SBCI smart contract can be access : *(soon)*
* **smart contract address :**  *(soon)*
* **ABI :** *(soon)*

## SwissBorg smart contract Workflow

![Workflow](doc/image/swissborgWwrkflow.png)

1. Bob want to buy SBCI token , he send Ether to SBCI smart contract 
2. SwissBorg check Bob KYC, update the token price and create SBCI token for Bob
3. Bob receive his SBCI token
4. Bob want to sell SBCI token to Alice (all ERC20 functions are implemented , so Bob use transfer, allowance, approve ....) , Bob transfert SBCI token to Alice
5. Alice receive her SBCI token
6. Alice to sell her token and get her dividend from Swissborg by asking for withdraw
7. Swissborg Amin check Alice KYC, update the token price and validate the withdraw
8. Alice receive her Ether

## SBCI smart contract functions
1.  **name :** name of the smart contrcat
2.  **totalSupply :** total supply of SBCI token
3.  **version :** version of SBCI smart contract
4.  **owner :** SwissBorg admin adresss
5.  **symbol :** token symbol
6.  **tokenCap :** maximum SBCI token allowed
7.  **balanceOf :** get SBCI balance of an address (Bob ckeck his SBCI balance)
8.  **getPrice :** corresponding price of Ether to SBCI
9.  **setPrice :** update the price of the token - only SwissBorg admin
10. **createToken :** create the token for an address - only SwissBorg admin
11. **transfer :** transfer SBCI token to another address (Bob transfer 10 SBCI to Alice)
12. **approve :** allow an address to spend amount of SBCI on behalf to another address (Bob allow Alice to transfer his SBCI to Kevin)
13. **allowance :** check amount of SBCI an address is allow spend on his behalf (Alice check SBCI amount she can spend on behalf of Bob)
14. **transferFrom :** transfer SBCI amount from an address to another address ( Alice transfer SBCI from Bob account to Kevin account)
15. **withdrawRequest :** Kevin ask to withdraw an mount of his SBCI
16. **validateWithdraw :** validate withdraw of an adress (SwissBorg admin validate Kevin withdraw and send corresponding Ether to kevin address) - only SwissBorg admin
17. **depositFund :** sent Ether to the contract , user can also sent the ether directly to the contract without using this function
18. **allocateFund :** sent Ether to the contract without creating SBCI token - only SwissBorg admin
19. **ithdrawFund :** withdraw Ether from the contract - only SwissBorg admin
20. **transferOwnership :** transfer Contract administration to another address - only SwissBorg admin

## Development

#### Install [testrpc] (https://github.com/ethereumjs/testrpc)
```
$ npm install -g ethereumjs-testrpc
```
#### Install [truffle] (http://truffleframework.com/):
```
$ npm install -g truffle 
```
#### Clone the SwissBorg smart contract project
```
$ git clone  https://github.com/SwissBorg/sbci.git 
```
#### Run testrpc
The command below run tesrpc and initiliaze 4 accounts with some Ether and unlock these accounts.

**REMEMBER TO CHANGE PRIVATE KEYS WITH YOURS**

```
$  testrpc --account="0x86f4axxxxxxxxxxxPRIVATEKEYxxxxxxxxxxxxxxxxxxxxxf16920325d4c2b78df39,50000000000000000000" --account="0x44024aa38fbbd25xxxxxxxxxxxxPRIVATEKEYxxxxxxxxxxxxxxxxxxxxx13ebaadcbcd64,100000000000000000000"  --account="0xc84ced8ebbb0eefxxxxxxxxxxxxPRIVATEKEYxxxxxxxxxxxxxxxxxxxxx033157d5c6ecad,0" --account="0x39205bb99f283872dd4459420d3fac68a13dc027751d5117c857a5e5da5184ca,1000000000000000000000" –-secure –u 0 –u 1 –u 2 –u 3
```
Stop testrpc with : CTRL + C

#### Compile the smart contrcats
* **Move to the directory project sbci**
```
$ cd sbci
```
* **Compile the project**
**REMEMBER TO CHANGE THE ADMIN ADDRESS ON Owner.sol**
```
$ truffle compile
```

* **Run unit test** 
```
$ truffle test
```

* **Deploy to development blockchain node (testrpc)**
```
$ truffle migrate
```

* **Interact with your contract on development blockchain (testrpc) with truffle console**
```
$ truffle console
```
Check the balance of account 0
```
> web3.eth.getBalance(web3.eth.accounts[0]).toNumber()
```
Send Ether from account 0 to the smart contract
```
> SwissborgIndex.deployed().then(inst => inst.sendTransaction({ from:web3.eth.accounts[0], value: web3.toWei(1, "ether")})).then(tx => console.log(tx))
```
Change the token price  **USE YOUR ADMIN ACCOUNT** 
```
> SwissborgIndex.deployed().then( inst => inst.setPrice(150, {from: web3.eth.accounts[3]}))
```
Get the new token price
```
> SwissborgIndex.deployed().then( inst => inst.getPrice()).then(result => swissborgindex = result.toString(10))
```

* **Deploy to Rinbeky or production blockchain node**
** UPDATE THE FILE truffle.js WITH YOUR NODE IP ADDRESS **
```
$ truffle migrate --network live
```

## Security and Liability
All contracts are WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

## License
All smart contracts are released under Apache License Version 2.0

## Contributors
* Charles Azanlekor ([azanux](https://github.com/azanux))
