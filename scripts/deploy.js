const hre = require("hardhat");

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables

  const [deployer, token1, token2, account1, account2, hacker, user1, user2] = await ethers.getSigners()

  // Deploy the contract
  const Tokens = await ethers.getContractFactory('Tokens');

  const deployedToken1 = await Tokens.deploy('DexCoin', 'DX', '1000')
  console.log(`DX deploy to: ${await deployedToken1.getAddress()}`)

  const deployedToken2 = await Tokens.deploy('My Token', 'MT', '1000')
  console.log(`MT deploy to: ${await deployedToken2.getAddress()}`)

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});