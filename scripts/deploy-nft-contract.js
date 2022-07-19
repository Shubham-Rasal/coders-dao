import sdk from "./initialize-sdk.js";
import {AddressZero} from "@ethersproject/constants";
import {readFileSync} from 'fs';



(async()=>{
    try{
        const nftContract = await sdk.deployer.deployEditionDrop({
            name: "The code",
            description: "The code will get you into the coders' DAO",
            image:readFileSync("scripts/assets/coder.jpg"),
            //scripts\assets\coder.jpg
            primary_sale_recipient: AddressZero,
          });

        console.log("✅ NFT contract deployed at: "+nftContract);
        const nft = sdk.getEditionDrop(nftContract);
        const metadata = await nft.metadata.get();
        console.log("✅ NFT contract metadata: "+(metadata));


    }
    catch(e){
        console.log("Could not deploy NFT contract!!😢",e);
        process.exit(1);

    }
})();


