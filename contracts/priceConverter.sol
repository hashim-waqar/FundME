//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// library cannot declare state variable , they cannot send ethers and also they have internal functions

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library priceConverter{

    function getPrice(AggregatorV3Interface priceFeed) private view returns(uint256){
     
        (,int256 price,,,) = priceFeed.latestRoundData();
        return uint256(price*1e10);
    }

    function getConversionRate(uint256 ethAmount,AggregatorV3Interface priceFeed) internal view returns(uint256){
        uint256 ethPrice = getPrice(priceFeed); // ETH/USD = 3000_000000000000000000
        // if we multiply it with eth in wei we will get extra zeros so we are dividing it with 1e18
        uint256 ethAmountInUSD = (ethPrice*ethAmount)/1e18; // 
        return ethAmountInUSD;
    }

}
