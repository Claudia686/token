const {
    expect
} = require('chai');
const {
    ethers
} = require('hardhat');

const tokens = (n) => {
    return ethers.parseUnits(n.toString(), 'ether');
}


describe('Token', () => {
    let deployer
    let token1, token2

    beforeEach(async () => {
        [deployer] = await ethers.getSigners()
        const Tokens = await ethers.getContractFactory('Tokens')
        token1 = await Tokens.deploy('DexCoin', 'DX', '1000')
        token2 = await Tokens.deploy('My Token', 'MT', '1000')
    })

    describe('Deployment', () => {
        // Token 1
        const name1 = 'DexCoin';
        const symbol1 = 'DX';
        const decimals1 = 18;
        const totalSupply1 = tokens('1000');

        // Token 2
        const name2 = 'My Token';
        const symbol2 = 'MT';
        const decimals2 = 18;
        const totalSupply2 = tokens('1000');

        it('Check parameters for token 1', async () => {
            expect(await token1.name()).to.equal(name1)
            expect(await token1.symbol()).to.equal(symbol1)
            expect(await token1.decimals()).to.equal(decimals1)
            expect(await token1.totalSupply()).to.equal(totalSupply1)
        })

        it('Check parameters for token 2', async () => {
            expect(await token2.name()).to.equal(name2)
            expect(await token2.symbol()).to.equal(symbol2)
            expect(await token2.decimals()).to.equal(decimals2)
            expect(await token2.totalSupply()).to.equal(totalSupply2)
        })
    })
})