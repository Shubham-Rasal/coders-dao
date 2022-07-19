import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import dontenv from "dotenv";

dontenv.config();


if(!process.env.ALCHEMY_API_KEY||process.env.ALCHEMY_API_KEY===""){
    console.log("ALCHEMY_API_KEY is not set");

    process.exit(1);
}

if(!process.env.PRIVAE_KEY||process.env.PRIVAE_KEY===""){
    console.log("PRIVAE_KEY is not set");
    process.exit(1);
}

if(!process.env.WALLET_ADD||process.env.WALLET_ADD===""){
    console.log("WALLET_ADDRESS is not set");
    process.exit(1);
}


const provider = new ethers.providers.JsonRpcProvider(process.env.process.env.ALCHEMY_API_KEY);


const sdk = new ThirdwebSDK();