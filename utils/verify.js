const { run } = require("hardhat")

const verify=async function(contractAddress,args){
    console.log("verifying the contract")

    try{
        await run("verify:verify",{
            address:contractAddress,
            contructorArguments:args
        })
    }catch(e){
        if(e.message.toLowerCase.includes("already verified")){
            console.log("contract already verified")
        }
        else{
            console.log(e)
        }
    }
}

module.exports={verify}
