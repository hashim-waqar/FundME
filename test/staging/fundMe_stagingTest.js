const { assert } = require("chai")
const { ethers,getNamedAccounts,network } = require("hardhat")
const {developmentChains}=require("../../helperHardhatConfig")

developmentChains.includes(network.name)?describe.skip:
describe("staging test of contract",function(){

    let fundMeContract,deployer
    const AMOUNT=ethers.utils.parseEther("0.1")
    beforeEach(async function(){
        deployer=(await getNamedAccounts()).deployer
        fundMeContract=await ethers.getContract("FundMe",deployer)
    })

    it("fund and withdraw",async function(){
        await fundMeContract.fund({value:AMOUNT})
        const withDraw=await fundMeContract.withdraw()
        
        const endingBalance=await fundMeContract.provider.getBalance(fundMeContract.address)
        assert.equal(endingBalance.toString(),0)
    })
})