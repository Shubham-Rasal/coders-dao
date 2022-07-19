import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import dontenv from "dotenv";

dontenv.config();


if(!process.env.ALCHEMY_API_KEY||process.env.ALCHEMY_API_KEY===""){
    console.log("ALCHEMY_API_KEY is not set");

    process.exit(1);
}

if(!process.env.PRIVATE_KEY_WALLET||process.env.PRIVATE_KEY_WALLET===""){
    console.log("PRIVATE_KEY_WALLET is not set");
    process.exit(1);
}

if(!process.env.WALLET_ADD||process.env.WALLET_ADD===""){
    console.log("WALLET_ADDRESS is not set");
    process.exit(1);
}


const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY_WALLET, provider);

const sdk = new ThirdwebSDK(wallet);



(async()=>{
    try{
        const address = await sdk.getSigner().getAddress();
        console.log("Sdk inialized with the following address: "+address);
    }

    catch(e){
        console.log("Could not initialize sdk!!😢",e);
        process.exit(1);
    }
})();

export default sdk;


