const hre = require("hardhat");

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
   
  // Deploy the contract
  const Tokens = await ethers.getContractFactory('Tokens');

  const DX = await Tokens.deploy('DexCoin', 'DX', '1000');
  console.log(`DX deploy to: ${await DX.getAddress()}`)

  const MT = await Tokens.deploy('My Token', 'MT', '1000');
  console.log(`MT deploy to: ${await MT.getAddress()}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});