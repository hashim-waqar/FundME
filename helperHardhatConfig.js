const networkConfig={
    5:{
        name:"goerli",
        ethUsdPriceFeed:"0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e"
    },
    80001:{
        name:"polygon",
        ethUsdPriceFeed:"0xF9680D99D6C9589e2a93a78A04A279e509205945"
    },
    43113:{
        name:"avalanche",
        ethUsdPriceFeed:"0x86d67c3D38D2bCeE722E601025C25a575021c6EA"
    },

}

const developmentChains=["hardhat","localhost"]

const DECIMALS=8
const INITIAL_ANSWER=200000000000

module.exports={
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER
}