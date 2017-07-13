// Specifically request an abstraction for SwissBorgIndex
var SwissBorgIndex = artifacts.require("SwissBorgIndex");

contract('ERC20Token', function(accounts) {

    var charles_account = accounts[0];
    var cyrus_account = accounts[1];
    var anthony_account = accounts[2];
    var admin_account = accounts[3];

    var deci = 1000000000000000000;

  // Check if All acccount haves a 0 SBCI tocken

  it("should check Charles have 0 SBCI token in his account", function() {
    return SwissBorgIndex.deployed().then(function(instance) {
      return instance.balanceOf(charles_account);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 0, "Charles account has more than 0 SBCI");
    });
  });

    it("should check Cyrus have 0 SBCI token in his account", function() {
    return SwissBorgIndex.deployed().then(function(instance) {
      return instance.balanceOf(cyrus_account);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 0, "Cyrus account has more than 0 SBCI");
    });
  });

    it("should check Anthony have 0 SBCI token in his account", function() {
    return SwissBorgIndex.deployed().then(function(instance) {
      return instance.balanceOf(anthony_account);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 0, "Anthony account has more than 0 SBCI");
    });
  });

  it("should check Admin have 0 SBCI token in his account", function() {
    return SwissBorgIndex.deployed().then(function(instance) {
      return instance.balanceOf(admin_account);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 0, "Admin account has more than 0 SBCI");
    });
  });


  //Check transfert
  

});