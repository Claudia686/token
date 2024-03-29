import React, {
    useEffect,
    useState
} from 'react';
import {
    ethers
} from 'ethers';
import config from './config.json';
import TOKEN_ABIS from './abis/token.json';
import './App.css';

function App() {

    // State to store the amount entered by the user
    const [amount, setAmount] = useState('');

    // Function to handle click event for Transfer button
    const handleTransferClick = () => {
        // Replace this with the functionality you want to happen when Transfer button is clicked
        console.log('Transfer button clicked');
        alert('Button clicket');
        console.log('Amount:', amount);
        alert('Button clicked');
    }

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


    return ( <
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
        /div>

        <
        div className = "action-selection" >
        <
        label htmlFor = "token" > Enter amount: < /label> <
        input type = "number"
        value = {
            amount
        }
        onChange = {
            (e) => setAmount(e.target.value)
        }
        /> <
        button className = "transfer-button" > Transfer < /button> <
        button className = "swap-button" > Swap < /button> < /
        div >

        <
        div className = "perform-action" >
        <
        button className = "connect-wallet-button" > Connect wallet < /button> < /
        div > <
        /div>

    );
}


export default App;