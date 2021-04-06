pragma solidity ^0.8.3;

import "./Ownable.sol";

contract GameRoom is Ownable {

    struct User {
        address account;
        uint balance;
        bool exists;
    }
    
    mapping(address => User) internal addressToAccount;
    
    function createUser() external {
        require(getExistance() == false);
        addressToAccount[msg.sender] = User(msg.sender, 0, true);
    }
    
    function getAccount() public view returns(address) {
        require(getExistance() == true);
        return addressToAccount[msg.sender].account;
    }
    
    function getBalance() public view returns(uint) {
        require(getExistance() == true);
        return addressToAccount[msg.sender].balance;
    }
    
    function getExistance() public view returns(bool) {
        return addressToAccount[msg.sender].exists;
    }
    
    function depositBalance(uint _amount) external payable {
        require(getExistance() == true);
        addressToAccount[msg.sender].balance += _amount;
    }
    
    function withdrawBalance(uint _amount) external payable {
        require(getExistance() == true);
        addressToAccount[msg.sender].balance -= _amount;
    } 
    
    function withdrawContract() external isOwner {
        address owner = getOwner();
        owner.transfer(address(this).balance);
    }
}