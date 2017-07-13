// Specifically request an abstraction for SwissBorgIndex
var SwissBorgIndex = artifacts.require("SwissBorgIndex");

contract('SwissBorgIndex', function(accounts) {

    var charles_account = accounts[0];
    var cyrus_account = accounts[1];
    var anthony_account = accounts[2];
    var admin_account = accounts[3];

    var admin_balance ;
    var cyrus_balance ;
    var contract_balance ;
    var deci = 1000000000000000000;

  // Check Contract informations
  it("should check SwissBorg Contract has 0 Ether", function() {
    return SwissBorgIndex.deployed().then(function(instance) {
      contract_balance = web3.eth.getBalance(instance.address).toNumber();
      return contract_balance;
    }).then(function(contract_balance) {
      assert.equal(contract_balance,0, "SwissBorg Contract has more than 0 Ether");
    });
  });

  it("should check SwissBorg Cyborg Index Smart Contract name is SwissBorg Cyborg Index", function() {
    return SwissBorgIndex.deployed().then(function(instance) {
      return instance.name();
    }).then(function(name) {
      assert.equal(name,"SwissBorg Cyborg Index", "The name of the contract is not SwissBorg Cyborg Index");
    });
  });

  it("should check SwissBorg Cyborg Index Smart Contract version is 1.0 ", function() {
    return SwissBorgIndex.deployed().then(function(instance) {
      return instance.version();
    }).then(function(version) {
      assert.equal(version,"1.0", "The version of the contract is not 1.0");
    });
  });

  it("should check SwissBorg Cyborg Index Smart Contract Total Supply is 0", function() {
    return SwissBorgIndex.deployed().then(function(instance) {
      return instance.totalSupply();
    }).then(function(totalsupply) {
      assert.equal(totalsupply.valueOf(),0, "The total Supply of the contract is not 0");
    });
  });

  it("should check SwissBorg Token Symbol is SBCI", function() {
    return SwissBorgIndex.deployed().then(function(instance) {
      return instance.symbol();
    }).then(function(symbol) {
      assert.equal(symbol,"SBCI","Symbol of SwissBorg token  is not SBCI");
    });
  });


  // Check the SwissBorg Contract Price
  it("should check the price of SBCI is 500 ", function() {
    return SwissBorgIndex.deployed().then(function(instance) {
      return instance.getPrice();
    }).then(function(price) {
      assert.equal(price.valueOf(), 500, "1 Ether is not equal to 500 SBCI");
    });
  });

  it("should check Admin change the SBCI token price to 100", function() {
    return SwissBorgIndex.deployed().then(function(instance) {
      var tx = instance.setPrice.sendTransaction(100, {from:admin_account});     
      return instance;
    }).then(function(instance) {
      return instance.getPrice();
    }).then(function(price) {
      assert.equal(price.valueOf(), 100, "SBCI price didn't change to 100");
    });
  });

  it("should check Charles is not allow to change the SBCI token price", function() {
    return SwissBorgIndex.deployed().then(function(instance) {     
      return instance.setPrice(100, {from:charles_account});
    }).catch(function(error) {
      assert.equal(error.message,"VM Exception while processing transaction: invalid opcode", "Charles is allow to change the SBCI price");
   });
  });

  //Check Fund allocation by Admin
  it("should check Admin send 20 Ether to SwissBorg Contract", function() {
      return SwissBorgIndex.deployed().then(function(instance) {       
      return instance.allocateFund.sendTransaction({from: admin_account, value: 20 * deci});;
    });
  });

  it("should check SwissBorg Contract receive 20 Ether fron Admin", function() {
      return SwissBorgIndex.deployed().then(function(instance) {
      contract_balance = web3.eth.getBalance(instance.address).toNumber();
      return contract_balance;
    }).then(function(contract_balance) {
      assert.equal(contract_balance,20 * deci, "SwissBorg Contract has not 20 Ether");
    });
  });

  it("should check Charles are not allow to allocate Fund to SwissBorg Contract", function() {
      return SwissBorgIndex.deployed().then(function(instance) {       
      return instance.allocateFund.sendTransaction({from: charles_account, value: 20 * deci});;
    }).catch(function(error) {
      assert.equal(error.message,"VM Exception while processing transaction: invalid opcode", "Charles is allow to change the SBCI price");
   });
  });

  //Check Fund Withdraw by Admin
    it("should check Admin withdraw 2 Ether from SwissBorg Contract", function() {
      return SwissBorgIndex.deployed().then(function(instance) {    
      contract_balance = web3.eth.getBalance(admin_account).toNumber();
      return instance.withdrawFund(2 * deci,{from: admin_account});
    }).then(function(address) {
      assert.closeTo(web3.eth.getBalance(admin_account).toNumber(), contract_balance + 2 * deci, 0.21 * deci, "Admin has not withdrawed 2 Ether");
    });
  });


  it("should check Charles are not allow to allocate Fund to SwissBorg Contract", function() {
      return SwissBorgIndex.deployed().then(function(instance) {       
      return instance.withdrawFund(2 * deci,{from: admin_account});
    }).catch(function(error) {
      assert.equal(error.message,"VM Exception while processing transaction: invalid opcode", "Charles is allow to change the SBCI price");
   });
  });

  //Check Charles and Cyrus buy SBCI token
  it("should check Charles send 10 Ether to the Contract to buy 1000 SBCI", function() {
      return SwissBorgIndex.deployed().then(function(instance) {       
      return instance.sendTransaction({from: charles_account, value: 10 * deci});;
    });
  });

  it("should check Charles still have 0 SBCI token in his account to buy 2000 SBCI", function() {
    return SwissBorgIndex.deployed().then(function(instance) {
      return instance.balanceOf(charles_account);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 0, "Charles account has more than 0 SBCI");
    });
  });

  it("should check Cyrus send 20 Ether to the Contract", function() {
      return SwissBorgIndex.deployed().then(function(instance) {       
      return instance.sendTransaction({from: cyrus_account, value: 20 * deci});;
    });
  });

  it("should check Cyrus still have 0 SBCI token in his account", function() {
    return SwissBorgIndex.deployed().then(function(instance) {
      return instance.balanceOf(cyrus_account);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 0, "Cyrus account has more than 0 SBCI");
    });
  });

  it("should check totalSupply is still  0 SBCI token", function() {
    return SwissBorgIndex.deployed().then(function(instance) {
      return instance.totalSupply();
    }).then(function(totalSupply) {
      assert.equal(totalSupply.valueOf(), 0, "Total Supply is greater than 0");
    });
  });

//Admin Validate the deposite and Charles receive his 1000 SBCI
  it("should check Admin create 1000 SBCI token for Charles", function() {
      return SwissBorgIndex.deployed().then(function(instance) {   
        var t = instance.createTokens.sendTransaction(charles_account,{from: admin_account});    
      return instance;
    }).then(function(instance) {
      return instance.totalSupply();
    }).then(function(totalSupply) {
      assert.equal(totalSupply.valueOf(), 1000 * deci, "Total Supply is not equal to 1000 SBCI");
    });
  });

  it("should check Charles are not allow to allocate create SBCI tocken to SwissBorg Contract", function() {
      return SwissBorgIndex.deployed().then(function(instance) {       
      return instance.createTokens(charles_account,{from: charles_account});
    }).catch(function(error) {
      assert.equal(error.message,"VM Exception while processing transaction: invalid opcode", "Charles is allow to change the SBCI price");
   });
  });

    it("should check Charles have 1000 SBCI token in his account to buy 2000 SBCI", function() {
    return SwissBorgIndex.deployed().then(function(instance) {
      return instance.balanceOf(charles_account);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 1000 * deci , "Charles account has more than 0 SBCI");
    });
  });

  it("should check Cyrus still have 0 SBCI token in his account", function() {
    return SwissBorgIndex.deployed().then(function(instance) {
      return instance.balanceOf(cyrus_account);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 0, "Cyrus account has more than 0 SBCI");
    });
  });

  it("should check Admin create 2000 SBCI token for Cyrus", function() {
      return SwissBorgIndex.deployed().then(function(instance) {   
        var tx = instance.createTokens(cyrus_account,{from: admin_account});    
      return instance;
    }).then(function(instance) {
      return instance.totalSupply();
    }).then(function(totalSupply) {
      assert.equal(totalSupply.valueOf(), 3000 * deci, "Total Supply is not equal to 3000 SBCI");
    });
  });

  it("should check Cyrus  have 2000 SBCI token in his account", function() {
    return SwissBorgIndex.deployed().then(function(instance) {
      return instance.balanceOf(cyrus_account);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 2000 * deci, "Cyrus account has not than 2000 SBCI");
    });
  });

    //Cyrus ask for  SBCI withdraw
  it("should check Cyrus ask for withdraw 5000 SBCI is reject", function() {
      return SwissBorgIndex.deployed().then(function(instance) {    
      return instance.withdrawRequest.sendTransaction(5000 * deci,{from: cyrus_account}); ;
    }).catch(function(error) {
      assert.equal(error.message,"VM Exception while processing transaction: invalid opcode", "Cyrus is allow to ask withdraw more than he have");
   });
  });

  it("should check Cyrus ask for withdraw 1000 SBCI", function() {
      return SwissBorgIndex.deployed().then(function(instance) {    
      var tx =  instance.withdrawRequest.sendTransaction(1000 * deci,{from: cyrus_account});
      return instance;
    }).then(function(instance) {
      return instance.totalSupply();
    }).then(function(totalSupply) {
      assert.equal(totalSupply.valueOf(), 3000 * deci, "Total Supply is not equal to 3000 SBCI");
    });
  });

  it("should check Cyrus  still have 2000 SBCI token in his account", function() {
    return SwissBorgIndex.deployed().then(function(instance) {
      return instance.balanceOf(cyrus_account);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 2000 * deci, "Cyrus account has not than 2000 SBCI");
    });
  });

  it("should check Cyrus is not allow to validate his widthdraw", function() {
      return SwissBorgIndex.deployed().then(function(instance) {    
      return instance.validateWithdraw.sendTransaction(cyrus_account,{from: cyrus_account});
    }).catch(function(error) {
      assert.equal(error.message,"VM Exception while processing transaction: invalid opcode", "Cyrus is allow to validate his  withdraw");
   });
  });

  it("should check Admin validate Cyrus withdraw ask for withdraw 1000 SBCI and Cyrus receive is money", function() {
      return SwissBorgIndex.deployed().then(function(instance) {   
      cyrus_balance = web3.eth.getBalance(cyrus_account).toNumber(); 
      return instance.validateWithdraw.sendTransaction(cyrus_account,{from: admin_account});;
    }).then(function(tx) {
      assert.equal(web3.eth.getBalance(cyrus_account).toNumber(), cyrus_balance + (1000 * deci)/100, "Cyrus account has more money");
    });
  });

  it("should check Total supply is 2000 SBCI token", function() {
      return SwissBorgIndex.deployed().then(function(instance) {   
      return instance.totalSupply();
    }).then(function(totalSupply) {
      assert.equal(totalSupply.valueOf(), 2000 * deci, "Total Supply is not equal to 2000 SBCI");
    });
  });

});