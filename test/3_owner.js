// Specifically request an abstraction for SwissBorgIndex
var SwissBorgIndex = artifacts.require("SwissBorgIndex");

contract('Owner', function(accounts) {

    var charles_account = accounts[0];
    var cyrus_account = accounts[1];
    var anthony_account = accounts[2];
    var admin_account = accounts[3];


  // Check the owner of the Contract
  it("should check SwissBorg Smart Contract owner is Admin", function() {
    return SwissBorgIndex.deployed().then(function(instance) {
      return instance.owner();
    }).then(function(owner) {
      assert.equal(owner,admin_account, "The Owner is not Admin");
    });
  });

  it("should check Admin transfer Ownership to Charles", function() {
    return SwissBorgIndex.deployed().then(function(instance) {
      instance.transferOwnership(charles_account, {from:admin_account});
      return instance;
    }).then(function(instance) {
      return instance.owner();
    }).then(function(owner) {
      assert.equal(owner,charles_account, "Charles is not the new Owner");
    });
  });

  it("should check Admin is not allow to transfer Ownership to Charles", function() {
    return SwissBorgIndex.deployed().then(function(instance) {      
      return instance.transferOwnership(charles_account, {from:admin_account});
    }).catch(function(error) {
      assert.equal(error.message,"VM Exception while processing transaction: invalid opcode", "Charles is not the new Owner");
   });
  });

  it("should check Charles transfer Ownership to Admin", function() {
    return SwissBorgIndex.deployed().then(function(instance) {
      instance.transferOwnership(admin_account, {from:charles_account});
      return instance;
    }).then(function(instance) {
      return instance.owner();
    }).then(function(owner) {
      assert.equal(owner,admin_account, "Admin is not the new Owner");
    });
  });
});