const { assert, expect } = require("chai")
const {network,deployments,ethers, getNamedAccounts}=require("hardhat")
const { developmentChains } = require("../../helperHardhatConfig")

!developmentChains.includes(network.name)?describe.skip:
describe("fundMe contract unit testing",function(){
    let fundMe,deployer,accounts
    const AMOUNT=ethers.utils.parseEther("1")

    beforeEach(async function(){
        await deployments.fixture("all")
        deployer=(await getNamedAccounts()).deployer
        accounts=await ethers.getSigners()
        fundMe=await ethers.getContract("FundMe",deployer)
        mockV3Aggregator=await ethers.getContract("MockV3Aggregator",deployer)
    })

    describe("constructor",function(){

        it("owner of contract is deployer",async function(){
            assert.equal(fundMe.signer.address,deployer)
        })

        it("aggregator address",async function(){
            const priceFeed=await fundMe.getPriceFeedAddress()
            assert.equal(mockV3Aggregator.address,priceFeed)
        })
    })

    describe("fundMe",function(){

        it("fails if you dont send enough eth",async function(){
            await expect(fundMe.fund()).to.be.revertedWith("not enough money send")
        })

        it("adds funders to array",async function(){
            await fundMe.fund({value:AMOUNT})
            const response=await fundMe.getFunders()
            assert.equal(response[0],deployer)
        })

        it("updates the fundedtoAddress ",async function(){
            await fundMe.fund({value:AMOUNT})
            const response=await fundMe.getAddressToFunders(deployer)
            assert.equal(response.toString(),AMOUNT.toString())
        })

        it("emits event when funded",async function(){
        
            await expect(fundMe.fund({value:AMOUNT})).to.emit(fundMe,"Funded")
        })

        it("multiple funders can fund",async function(){
            
            for(let i=0;i<5;i++){
                await fundMe.connect(accounts[i]).fund({value:AMOUNT})
            }
            const funders=await fundMe.getFunders()
            for(let i=0;i<5;i++){
                assert.equal(accounts[i].address.toString(),funders[i].toString())
            }
        })
    })

    describe("withdraw",function(){
        beforeEach(async function(){
            await fundMe.fund({value:AMOUNT})
                //funding multiple accounts
                for(let i=1;i<5;i++){
                    await fundMe.connect(accounts[i]).fund({value:AMOUNT})
                }
        })

        it("withdraw fund",async function(){
           
            const startingBalanceFundMe=await ethers.provider.getBalance(fundMe.address)
            const startingBalanceDeployer=await ethers.provider.getBalance(deployer)
            const response=await fundMe.withdraw()
            const reciept=await response.wait(1)
            const {gasUsed,effectiveGasPrice}=reciept
            const gasCost=gasUsed.mul(effectiveGasPrice)
            
            const endingBalanceFundMe=await ethers.provider.getBalance(fundMe.address)
            const endingBalanceDeployer=await ethers.provider.getBalance(deployer)
            assert.equal(endingBalanceFundMe.toString(),0)
            assert.equal(startingBalanceFundMe.add(startingBalanceDeployer).toString(),endingBalanceDeployer.add(gasCost).toString())
        })

        it("only owner of contract can withdraw",async function(){
            const attacker=await fundMe.connect(accounts[1])

            await expect(attacker.withdraw()).to.be.reverted
        })

        it("funders array is empty after withdraw",async function(){
            await fundMe.withdraw()
            const funders=await fundMe.getFunders()
            assert.equal(funders.length,0)
        })


        it("funders will not exist after withdraw",async function(){
            await fundMe.withdraw()
           
            for(let i=0;i<5;i++){
            const funders=await fundMe.getAddressToFunders(accounts[i].address)
            assert.equal(funders,0)
            }
        })

        
        
    })
})