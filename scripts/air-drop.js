import sdk from "./initialize-sdk.js";

const tokenAddress = sdk.getToken(process.env.TOKEN_ADDRESS);

const nftContract = sdk.getEditionDrop(process.env.NFT_CONTRACT_ADDRESS);


(async () => {

    try {

        const claimesWalletAddresses = await nftContract.history.getAllClaimerAddresses(0);
        if (claimesWalletAddresses.length === 0) {
            console.log("No claims wallet addresses found");
            process.exit(0);
        }

        const airdropTargets = claimesWalletAddresses.map((address)=>{
            const randomAmount = Math.floor(Math.random() *(100000 - 1000 + 1) );
            console.log("✅ Going to airdrop", randomAmount, "tokens to", address);


            const airdropTarget = {
                toAddress: address,
                amount:randomAmount
            }


            return airdropTarget;

        })


        console.log("✅ Going to airdrop", airdropTargets);
        const airdropResult = await tokenAddress.transferBatch(airdropTargets);
        console.log("✅ Airdrop result:", airdropResult);

    }
    catch (e) {
        console.log("Could not airdrop tokens!!😢", e);
    }


})();