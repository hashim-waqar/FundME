const { ethers, getNamedAccounts } = require("hardhat")

async function main(){

    const {deployer}=await getNamedAccounts()
    const fundMe=await ethers.getContract("FundMe",deployer)
    console.log("funding.....")    
    const fund=await fundMe.fund({value:ethers.utils.parseEther("0.1")})
    console.log(fund)
    console.log("funded......")
    


}


main()
.then(()=>process.exit(0))
.catch((e)=>{
    console.log(e)
    process.exit(1)
})