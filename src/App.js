import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import './App.css';

// ABIs
import token from './abis/token.json';

// Config
import configToken from './config.json';

function App() {

// Define data
  
 
  return (
    
 <div class="container">
        <h1>Tokens Transfer or Swap</h1>
        <div class="token-selection">
            <label for="token">Select Token:</label>
            <select id="token">
                <option value="token1">DX</option>
                <option value="token2">MT</option>
            </select>
        </div>
        <div class="action-selection">
            <button>Transfer</button>
            <button>Swap</button>
        </div>
        <div class="perform-action">
            <button>Connect wallet</button>
        </div>
    </div>

    
  );
}

export default App;
