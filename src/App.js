import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import config from './config.json';
import TOKEN_ABIS from './abis/token.json';
import './App.css';
import tokenAddresses from './tokens.json';

function App() {
  const user1Address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const user2Address = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [currentTokenInstance, setCurrentTokenInstance] = useState(null)
  const [fromAddress, setFromAddress] = useState(user1Address)
  const [toAddress, setToAddress] = useState(user2Address)
  const [selectedToken, setSelectedToken] = useState('token2')
  const [amount, setAmount] = useState(1)

  const transferHandler = async () => {
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();

    const toAddress = (signerAddress.toLowerCase() === user1Address.toLowerCase()) ? user2Address : user1Address;
    const validAddress = ethers.getAddress(toAddress);

    const user1BalanceBefore = await currentTokenInstance.balanceOf(user1Address)
    console.log('user1BalanceBefore:', ethers.formatUnits(user1BalanceBefore, 18))

    // Token balance before transfer
    const tokenBalance = await currentTokenInstance.balanceOf(signerAddress)
    console.log('tokenBalance:', ethers.formatUnits(tokenBalance, 18))

    const transaction = await currentTokenInstance.connect(signer).transfer(toAddress, amount)
    await transaction.wait();
    
    // Token balance after transfer
    const user1BalanceAfter = await currentTokenInstance.balanceOf(user1Address)
    console.log('user1BalanceAfter:', ethers.formatUnits(user1BalanceAfter, 18))
}

const connectHandler = async () => {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'})
  const account = accounts[0]
  setAccount(account)

  // Connect Ethers to blockchain
  const newProvider = new ethers.BrowserProvider(window.ethereum);
  setProvider(newProvider);
}

 const loadBlockchainData = async () => {
    const { chainId } = await provider.getNetwork();

    setFromAddress(account)
    setToAddress(account === user1Address ? user2Address : user1Address)

    // Token Smart Contract 
    const selectedTokensAddress = tokenAddresses.tokens[selectedToken];
    const currentTokenInstance = new ethers.Contract(selectedTokensAddress, TOKEN_ABIS, provider)
    setCurrentTokenInstance(currentTokenInstance)
  }
  
   // Event listener for Ethereum account changes 
   const handleAccountsChanged = (accounts) => {
    console.log('Accounts changed', accounts)
    setAccount(accounts[0])
   }

    if (window.ethereum) {
    window.ethereum.on('accountsChanged', handleAccountsChanged)
    }

  useEffect(() => {
    if (provider) {
      loadBlockchainData()
    }

  }, [provider, selectedToken]);

    return (
    <div className="container">
      <h1>Tokens Transfer or Swap</h1>
      <button className="connect-wallet-button" onClick={connectHandler}>Connect wallet</button>
      {currentTokenInstance ? (
        <>
          <div className="token-selection">
            <label htmlFor="token">Select Token:</label>
            <select id="token" value={selectedToken} onChange={(e) => setSelectedToken(e.target.value)}>
              <option value="token1">DX</option>
              <option value="token2">MT</option>
            </select>
          </div>
          <div className="action-selection">
            <label htmlFor="amount">Enter amount:</label>
            <input type="number" id="amount" onChange={(e) => setAmount(e.target.value)} />
          </div>
          <button className="transfer-button" onClick={transferHandler}>Transfer</button>
          <button className="swap-button">Swap</button>
        </>
      ) : (
        <p>Loading or Connect to Wallet...</p>
      )}
    </div>
  );
}

export default App;