pragma solidity ^0.4.11;


/**
 * @title Owner
 * @author Charles Azanlekor
 * @dev Owner contract has an owner address, and provides premission control
 */
contract Owner {

  
  //This is the owner of the contract
  //#######    remember to replace it with a real adress
  //address public owner = 0x3F993383C6E6413DB788A20212559e404b82605f;
  address public owner = 0xE98b66De7C650E009f4362dCFb5aB5b20140B2bB;


  /**
   * @dev Throws if called by any account other than the owner. 
   */
  modifier onlyOwner() {
    if (msg.sender != owner) {
      throw;
    }
    _;
  }

  
  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param _newOwner address
   */
  function transferOwnership(address _newOwner) onlyOwner {
    if (_newOwner != address(0)) {
      owner = _newOwner;
    }
  }

}