pragma solidity ^0.4.11;

import "./StandardToken.sol";
import "./Owner.sol";



/**
 * @title Swissborg Index
 * @author Charles Azanlekor <charles@swissborg.com>
 * @dev ERC20 Token for SwissBorg Cyborg Index, with token creation
 */
contract SwissborgIndex is StandardToken , Owner  {


      //The name of the token
  string public constant name = "SwissBorg Cyborg Index";

  //Symbol of the Token
  string public constant symbol = "SBCI";

  //Amount of decimal for display purposes
  // @TODO Remember to change this value
  uint public constant decimals = 18;

  //Version of the Token
  string public constant version = "1.0";


  // 1 ether = 500 SBCI tokens
  //#######  remember to initialize the price of the Token
  uint internal price = 500;


   mapping (address => uint256) internal depositBalanceOf;
   mapping (address => uint256) internal withdrawBalanceOf;
   mapping (address => uint256) internal withdrawRequestBalanceOf;


  //This is the value of max token in SwissBorgIndex
  //Remember to change this value for you Market Cap
  // @TODO
  uint256 public constant tokenCap =  20 * (10**6) * 10**decimals;
 
  /**
   * @dev Fallback function which receives ether and put the appropriate Ether in the SwissBorg Bank
   * 
   */
  function () payable {
    depositFund();
  }


   /**
   * @dev this function allow user to deposit their Ether SwissBorg Bank
   *
   */
   function depositFund() payable {
       require (msg.value > 0) ;
       require (totalSupply < tokenCap);
       depositBalanceOf[msg.sender] = depositBalanceOf[msg.sender].add(msg.value);
       DepositeDone(msg.sender, msg.value);
   }


  /**
   * @dev Creates tokens and send to the specified address.
   * This function transfer fund to the owner of this Smart Contract
   * @param _user address which will recieve the new tokens.
    */
  function createTokens(address _user)  onlyOwner() {
    uint256 amount = depositBalanceOf[_user];      
    uint tokens = amount.mul(getPrice());
    totalSupply = totalSupply.add(tokens);
    balances[_user] = balances[_user].add(tokens);
    depositBalanceOf[_user] = 0 ;
    TokenCreated(_user, amount);
  }

  /**
   * @dev this function allow user to ask for withdraw, User Want to sell his token and get Ether from SwissBorg Bank
   * The user won't receive his Ether directly , the SwissBorg have to valide the Withdraw before
   * @param _amount The amount of SBCI the user want to withdraw
   */
   function withdrawRequest(uint256 _amount) {
       require (_amount > 0);       
       withdrawRequestBalanceOf[msg.sender] = withdrawRequestBalanceOf[msg.sender].add(_amount);
       if(balances[msg.sender] < withdrawRequestBalanceOf[msg.sender]) throw;
       WithdrawRequest(msg.sender,_amount);
   }


   /**
   * @dev this function allow SwissBorg Owner to withdraw Ether from SwissBorg Bank
   * @param _amount the Owner withdraw from the SwissBorg Bank
   */
   function withdrawFund(uint256 _amount) onlyOwner() {
       require(_amount > 0);
       if(!owner.send(_amount))  throw;
       OwnerWithdraw(msg.sender, _amount);
   }


   /**
   * @dev this function allow SwissBorg Owner to send Ether to SwissBorg Bank
   * 
   */
   function allocateFund() onlyOwner() payable {
       require(msg.value > 0);
       OwnerDeposited(msg.sender, msg.value);
   }


    /**
   * @dev destroy tokens and send corresponding Eth to the specified address.
   * @param _recipient The address which will recieve the Eth
   */
  function validateWithdraw(address _recipient)  onlyOwner() {

    uint256 tokens = withdrawRequestBalanceOf[_recipient];
    require(tokens > 0);
    uint256 amount = tokens.div(getPrice());
    totalSupply = totalSupply.sub(tokens);

    balances[_recipient] = balances[_recipient].sub(tokens);
    withdrawRequestBalanceOf[_recipient] = 0;

     if (!_recipient.send(amount)) throw;
      WithdrawDone(msg.sender,amount);
  }


  /**
   * @dev replace this with any other price function
   * @return The price per unit of token. 
   */
  function getPrice() constant returns (uint result) {
    return price;
  }

 /**
  * @dev change the value by sending transsaction to contract
  * @param _price new price of the NAV , only the SwissBorg owner can change the NAV price
  */
  function setPrice(uint _price) onlyOwner() {
      require(_price > 0);
      price = _price;
    }

    event DepositeDone(address indexed by, uint256 amount); //When a user deposit Ether on SwissBorg Bank
    event TokenCreated(address indexed by, uint256 amount); //When a user get his SBCI token
    event WithdrawRequest(address indexed by, uint256 amount); // When a user ask for a withdraw of his Ether
    event WithdrawDone(address indexed by, uint256 amount); // When a user get back his Ether and sell his SBCI Token to SwissBorg Bank


    event OwnerDeposited(address indexed by, uint256 amount); //When a SwissBorg Owner deposit Ether on SwissBorg Bank
    event OwnerWithdraw(address indexed by, uint256 amount); // When a SwissBorg Ownerwithdown Ether from the contrcat

}