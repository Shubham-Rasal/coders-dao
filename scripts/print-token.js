import sdk from './initialize-sdk.js';

const tokenAddress = sdk.getToken(process.env.TOKEN_ADDRESS);
console.log( await tokenAddress.balance());


(async () => {

    try {
        const amount = 500_000_000;
        await tokenAddress.mintToSelf(amount);
        const totalSupply = await tokenAddress.totalSupply();
        console.log("✅ Total supply:", totalSupply);
        // await tokenAddress.metadata.set({symbol:"CUT"})
        
    } catch (error) {
        console.log("❌ Printing token unsuccessful!! ",error);
    }


})();