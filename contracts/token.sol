// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;


contract Tokens {
    string public name;
    string public symbol;
    uint256 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

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
 }

    