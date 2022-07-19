import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import dontenv from "dotenv";

dontenv.config();


if(!process.env.ALCHEMY_API_KEY||process.env.ALCHEMY_API_KEY===""){
    console.log("ALCHEMY_API_KEY is not set");

    process.exit(1);
}

if(process.env.PRIVAE_API_KEY===""||process.env.PRIVAE_API_KEY===""){


const sdk = new ThirdwebSDK();