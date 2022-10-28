//SPDX-License-Identifier:MIT

pragma solidity ^0.8.17;

//imports
import "./priceConverter.sol";

//errors
error FundMe__NotOwner();

/** @title This contract is for crowd funding
*   @author Hashim Waqar
*   @notice This contract is sample funding contract
*   @dev s_priceFeed as out library      
*/

contract FundMe{

    //library
    using priceConverter for uint256;

    //state variables
    // conversion rate gives as extra 18 zeros so we are multiplying it with 1*18
    uint256 private constant MINIMUM_USD = 50 * 1e18; 
    
    address private immutable i_ownerOfContract;

    address[] private s_funders;

    mapping(address=>uint256) private s_addressToFunders;

    AggregatorV3Interface private s_priceFeed;
    
    // events
    event Funded(address indexed from,uint256 amount);

    //modifiers
    modifier onlyOwner(){
            //require(msg.sender == i_ownerOfContract,"sender is not owner");
           if(msg.sender!=i_ownerOfContract){
               revert FundMe__NotOwner();
           } 
            _;

    }

    
    constructor(address priceFeedAddress){
            i_ownerOfContract=msg.sender;
            s_priceFeed=AggregatorV3Interface(priceFeedAddress);
        }

    receive() external payable{
        fund();
    }

    fallback() external payable{
        fund();
    }



    /**
     * @notice fund function funds the contract
     * @dev implements price feed as our library
     */

    function fund() public payable{
        //want to be able to set a minimum fund amouunt in USD
        require(msg.value.getConversionRate(s_priceFeed)>=MINIMUM_USD,"not enough money send");
        
        s_funders.push(msg.sender);
        s_addressToFunders[msg.sender]=msg.value;
        emit Funded(msg.sender,msg.value);
    }

    /**
     * @notice withdraw function withdraw ethers from contract
     */

    function withdraw() external  onlyOwner{
        
        address[] memory funders=s_funders;
        uint256 length=funders.length;
        for(uint256 funderIndex=0;funderIndex<length;funderIndex++){
            address funder=funders[funderIndex];
            s_addressToFunders[funder]=0;
        }

        //resetting array
        s_funders=new address[](0);

        // we can withdraw fund by
        // transfer (it uses 2300 gas and throws an error if more gas is require)
        //msg.sender is type address but payable msg.sender is payable type 
        //payable(msg.sender).transfer(address(this).balance);
        // send (it uses 2300 gas and returns bool on fail or success)
        //bool sendSuccess=payable(msg.sender).send(address(this).balance);
        // require(sendSuccess,"failed to send");
        // call  (is lower level command and we call any function without ABI it returns bool and data in bytes)
        (bool callSuccess,)=payable(msg.sender).call{value:address(this).balance}("");
        require(callSuccess,"call failed");


    }

    function ownerOfContract() external view returns(address){
        return i_ownerOfContract;
    }

    function minimumFunding() external pure returns(uint256){
        return MINIMUM_USD;
    }

    function getFunders() external view returns(address[] memory){
        return s_funders;
    }
 
    function getAddressToFunders(address funder ) external view returns(uint256){
        return s_addressToFunders[funder];
    }

   function getPriceFeedAddress() external view returns(address){
        return address(s_priceFeed);
   }


}