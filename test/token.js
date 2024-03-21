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
    let deployer, token1, token2, account1, account2, hacker, user1, user2

    beforeEach(async () => {
        [deployer, token1, token2, account1, account2, hacker, user1, user2] = await ethers.getSigners()
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

        it('Checks parameters for token 1', async () => {
            expect(await token1.name()).to.equal(name1)
            expect(await token1.symbol()).to.equal(symbol1)
            expect(await token1.decimals()).to.equal(decimals1)
            expect(await token1.totalSupply()).to.equal(totalSupply1)
        })

        it('Checks parameters for token 2', async () => {
            expect(await token2.name()).to.equal(name2)
            expect(await token2.symbol()).to.equal(symbol2)
            expect(await token2.decimals()).to.equal(decimals2)
            expect(await token2.totalSupply()).to.equal(totalSupply2)
        })
    })

    describe('Transfer', () => {
        describe('Success', async () => {
            it('Should transfer tokens from token 1 to account 1', async () => {
                // Check owner balance before
                const initialOwnerBalance = await token1.balanceOf(deployer.address)
                const transferAmount = tokens(10)

                // Transfer to account 1
                const transferTx1 = await token1.connect(deployer).transfer(account1.address, transferAmount)
                await transferTx1.wait()

                // Check owner balance after
                const finalOwnerBalance = await token1.balanceOf(deployer.address)
                const finalAccount1Balance = await token1.balanceOf(account1.address)

                expect(finalOwnerBalance).to.be.lessThan(initialOwnerBalance)
                expect(finalAccount1Balance).to.equal(transferAmount)
            })

            it('Should transfer tokens from token 2 to account 2', async () => {
                // Check owner balance before
                const initialOwnerBalance = await token2.balanceOf(deployer.address)
                const transferAmount = tokens(5)

                // Transfer to account 2
                const transferTx2 = await token2.connect(deployer).transfer(account2.address, transferAmount)
                await transferTx2.wait()

                // Check owner balance after
                const finalOwnerBalance = await token2.balanceOf(deployer.address)
                const finalAccountBalance = await token2.balanceOf(account2.address)

                expect(finalOwnerBalance).to.be.lessThan(initialOwnerBalance)
                expect(finalAccountBalance).to.equal(transferAmount)
            })

            it('Transfers tokens from token 1 to users', async () => {
                const transferAmount = tokens(100)

                // Transfer to user 1
                const transferTx1 = await token1.connect(deployer).transfer(user1.address, transferAmount)
                await transferTx1.wait()

                // Transfer to user 2
                const transferTx2 = await token1.connect(deployer).transfer(user2.address, transferAmount)
                await transferTx2.wait()
            })

            it('Should transfer tokens successfully with enough balance', async () => {
                const transferAmount = tokens(3)

                // Check balance of account 1 before transfer
                const balanceBefore = await token2.balanceOf(account1.address)

                const transferTx3 = await token2.connect(deployer).transfer(account1.address, transferAmount)
                await transferTx3.wait()

                // Check balance of account 1 after transfer
                const balanceAfter = await token2.balanceOf(account1.address)

                // Check if balance of account 1 has increased after transfer
                expect(balanceAfter).to.equal(transferAmount)
            })

            it('Emit Transfer event with correct parameters', async () => {
                const transferAmount = tokens(1)

                // Transfer token from token 2 between accounts
                const transferToUser2 = await token2.connect(deployer).transfer(user2.address, transferAmount)
                await expect(transferToUser2).to.emit(token2, 'Transfer').withArgs(deployer.address, user2.address, transferAmount)
            })

            describe('Failure', async () => {
                it('Rejects with zero balance', async () => {
                    const transferAmount = tokens(1);
                    await expect(token1.connect(hacker).transfer(deployer.address, transferAmount)).to.be.reverted;
                })
            })
        })
    })
})