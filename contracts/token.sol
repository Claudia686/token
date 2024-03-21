// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

contract Tokens {
    string public name;
    string public symbol;
    uint256 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Swap(address indexed _from, address indexed _to, uint256 _value);

     constructor (
     string memory _name,
     string memory _symbol,
     uint256 _totalSupply
    ) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply *(10**decimals);
        balanceOf[msg.sender] = totalSupply;
     }

 function transfer(address _to, uint256 _value)
public 
returns (bool success)
{
require(balanceOf[msg.sender] >= _value, "Insufficient balance");
require(_value >= 0, "Transfer amount must be greater than zero");

balanceOf[msg.sender] -= _value;
balanceOf[_to] += _value;

//emit transfer event
emit Transfer(msg.sender, _to, _value);
return true;
 }

 function swap(address _to, uint256 _value) 
 public 
 returns (bool success) 
 {
    require(_value > 0 ,"Swap must be greater than zero");
    require(_to != address(this), "Cannot swap token for itself");

    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;

    emit Swap(msg.sender, _to, _value);
    return true;
 }
}


    