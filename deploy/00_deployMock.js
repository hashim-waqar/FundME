
const {network}=require("hardhat")
const { developmentChains,DECIMALS,INITIAL_ANSWER } = require("../helperHardhatConfig")

module.exports=async({getNamedAccounts,deployments})=>{
    const {deploy,log} = deployments
    const {deployer} = await getNamedAccounts()

    if(developmentChains.includes(network.name)){
        log("local network detected")

        await deploy("MockV3Aggregator",{
            from:deployer,
            log:true,
            args:[DECIMALS,INITIAL_ANSWER],
            waitConfirmations:network.config.blockConfirmations || 1
        })
        log("Mocks deployed")
    }

}

module.exports.tags=["all","mocks"]