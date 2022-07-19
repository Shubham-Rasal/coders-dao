import sdk from "./initialize-sdk.js"
import {MaxUint256} from "@ethersproject/constants";

const nftContract = sdk.getEditionDrop(process.env.NFT_CONTRACT_ADDRESS);

(async ()=>{

    try{
        const claimConditions = [
        {
            startTime: new Date(),
            maxQuantity: 100_000,
            price:0,
            quantityLimitPerTransaction: 1,
            waitInSeconds: MaxUint256,
            
            
        }];
        
        await nftContract.claimConditions.set("0",claimConditions);
        console.log("✅ Claim conditions set!! ");
    
        
    }
    catch(e)
    {
        console.log("Could not set claim conditions😢",e);
    }
})();