// Specifically request an abstraction for SwissBorgIndex
var SwissBorgIndex = artifacts.require("SwissBorgIndex");

contract('Balance', function(accounts) {

    var charles_account = accounts[0];
    var cyrus_account = accounts[1];
    var anthony_account = accounts[2];
    var admin_account = accounts[3];

    var deci = 1000000000000000000;

    // Check if All acccounts have a good value of Ether

  it("should check Charles have 50 Ether in his account", function() {
    assert.closeTo(web3.eth.getBalance(charles_account).toNumber(), 50 * deci, 0.0021 * deci, "50 Ether wasn't in the Charles account");
  });

  it("should check Cyrus have 100 Ether in his account", function() {
    assert.closeTo(web3.eth.getBalance(cyrus_account).toNumber(), 100 * deci, 0.0021 * deci, "100 Ether wasn't in the Cyrus account");
  });

  it("should check Anthony have 0 Ether in his account", function() {
    assert.closeTo(web3.eth.getBalance(anthony_account).toNumber(), 0, 0.0021 * deci, "0 Ether wasn't in the Anthony account");
  });

  it("should check Admin have 1000 Ether in his account (minus the gas use to deploy the contract)", function() {
    assert.closeTo(web3.eth.getBalance(admin_account).toNumber(),1000 * deci, 5 * deci,"1000 Ether wasn't in the Admin account (minus the gas use to deploy the contract) ");
  });

});