import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Contract } from 'ethers';
import config from './config.json';
import TOKEN_ABIS from './abis/token.json';
import './App.css';

function App() {
    
    const loadBlockchainData = async () => {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        })
        console.log(accounts[0])

        // Connect Ethers to blockchain
        const provider = new ethers.BrowserProvider(window.ethereum);
        const {
            chainId
        } = await provider.getNetwork()
        console.log(chainId)

        // Token Smart Contract 
        const token = new ethers.Contract(config[chainId].MT.address, TOKEN_ABIS, provider)
        console.log(token.address)
        const symbol = await token.symbol()
        console.log(symbol)
    }

    useEffect(() => {
        loadBlockchainData()
    })

    return (

        <
        div className = "container" >
        <
        h1 > Tokens Transfer or Swap < /h1> <
        div className = "token-selection" >
        <
        label htmlFor = "token" > Select Token: < /label> <
        select id = "token" >
        <
        option value = "token1" > DX < /option> <
        option value = "token2" > MT < /option> < /
        select > <
        /div> <
        div className = "action-selection" >
        <
        button > Transfer < /button> <
        button > Swap < /button> < /
        div > <
        div className = "perform-action" >
        <
        button > Connect wallet < /button> < /
        div > <
        /div>


    );
}

export default App;