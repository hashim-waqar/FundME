const { ethers,getNamedAccounts } = require("hardhat")

async function main(){
    const {deployer}=await getNamedAccounts()
    const fundMe=await ethers.getContract("FundMe",deployer)
    const withdraw=await fundMe.withdraw()
    console.log('withdrawed...........')
}



main()
.then(()=>process.exit(0))
.catch((e)=>{
    console.log(e)
    process.exit(1)
})