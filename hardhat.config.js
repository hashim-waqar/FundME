require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-etherscan")
require("@nomicfoundation/hardhat-chai-matchers")
require("dotenv").config()
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")
/** @type import('hardhat/config').HardhatUserConfig */

//////////////GOERLI////////////////
const RPC_URL_Alchemy_GOERLI = process.env.RPC_URL_Alchemy_GOERLI
const PRIVATE_KEY_METAMASK_GOERLI  = process.env.PRIVATE_KEY_METAMASK_GOERLI 
// const ETHERSCAN_API_KEY=process.env.ETHERSCAN_API_KEY

/////////////Polygon////////////////
const PRIVATE_KEY_METAMASK_POLYGON=process.env.PRIVATE_KEY_METAMASK_POLYGON
const RPC_URL_Alchemy_POLYGON = process.env.RPC_URL_Alchemy_POLYGON
// const POLYGONSCAN_API_KEY=process.env.POLYGONSCAN_API_KEY

/////////////Avalanche////////////////
const PRIVATE_KEY_METAMASK_AVALANCHE=process.env.PRIVATE_KEY_METAMASK_AVALANCHE
const RPC_URL_AVALANCHE=process.env.RPC_URL_AVALANCHE

////////////////////////

const COINMARKETCAP_API_KEY=process.env.COINMARKETCAP_API_KEY


module.exports = {
  defaultNetwork:"hardhat",
  networks:{
    goerli:{
        url:RPC_URL_Alchemy_GOERLI,
        accounts:[PRIVATE_KEY_METAMASK_GOERLI],
        chainId:5,
        blockConfirmations:6
    },

    polygon:{
      url:RPC_URL_Alchemy_POLYGON,
      accounts:[PRIVATE_KEY_METAMASK_POLYGON],
      chainId:80001
     
    },

    avalanche:{
      url:RPC_URL_AVALANCHE,
      accounts:[PRIVATE_KEY_METAMASK_AVALANCHE],
      chainID:43114
    },

    

    localhost:{
      
      url:'http://127.0.0.1:8545/',
      chainId: 31337
    }
  },

  solidity: {
    compilers:[{version:"0.8.17"},{version:"0.6.6"}]
  },

  // etherscan:{
  //   apiKey:{
  //     goerli:ETHERSCAN_API_KEY,
  //     polygon:POLYGON_APY_KEY
  //   }
  // },
 
  gasReporter:{
      enabled:true,
      outputFile:"gas-reporter.txt",
      // currency:"USD",
      // coinMarketCap:COINMARKETCAP_API_KEY
  },

    namedAccounts:{
        deployer:{
          default:0,
          5:0
         
        },
        user:{
          default:1
        }
    }


};
