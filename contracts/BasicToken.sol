pragma solidity ^0.4.11;



import './SafeMath.sol';
import './ERC20Basic.sol';


/**
 * @title Basic token
 * @dev Basic version of StandardToken, with no allowances. 
 * This code come from Zepellin
 */
contract BasicToken is ERC20Basic {

  using SafeMath for uint;

  mapping(address => uint) balances;

  /**
   * @dev Fix for the ERC20 short address attack.
   */
  modifier onlyPayloadSize(uint _size) {
     if(msg.data.length < _size + 4) {
       throw;
     }
     _;
  }

  /**
  * @dev transfer token for a specified address
  * @param _to The address to transfer to.
  * @param _value The amount to be transferred.
  */
  function transfer(address _to, uint _value) onlyPayloadSize(2 * 32) {
    balances[msg.sender] = balances[msg.sender].sub(_value);
    balances[_to] = balances[_to].add(_value);
    Transfer(msg.sender, _to, _value);
  }

  /**
  * @dev Gets the balance of the specified address.
  * @param _user The address to query the the balance of. 
  * @return An uint representing the amount owned by the passed address.
  */
  function balanceOf(address _user) constant returns (uint balance) {
    return balances[_user];
  }

}
