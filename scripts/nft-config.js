import sdk from "./initialize-sdk.js";
import { AddressZero } from "@ethersproject/constants";
import { readFileSync } from "fs";

const nftContract = sdk.getEditionDrop(process.env.NFT_CONTRACT_ADDRESS);

(async () => {

    try {
        const metadata = [
            {
                name:"code",
                description:"The code will get you into the coders' DAO",
                image:readFileSync("scripts/assets/coder.jpg"),
            }

            
        ]

         await nftContract.createBatch(metadata);
        console.log("✅ Batch created: ");

    } catch (error) {
        console.log("Could not deploy NFT!!😢", error);
    }
})();