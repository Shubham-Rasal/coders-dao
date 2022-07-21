import sdk from './initialize-sdk.js';
const vote = sdk.getVote(process.env.VOTING_CONTRACT_ADDRESS);
const token = sdk.getToken("0x925F1c186140996cAb95400Ce9Fc83B4293809Bc");

(async () => {

//granting vote rights to the voting contract
    try {
        await token.roles.grant("minter",vote.getAddress());
        console.log("✅ Token minter role granted!! ");
    } catch (error) {
        console.log("Could not set permissions to mint coins.", error);
        process.exit(1);
    }
    try {
        const ownesTokenAmount = await token.balanceOf(process.env.WALLET_ADD);
        console.log("✅ Owned token amount: ", ownesTokenAmount);
        const ownedAmount = ownesTokenAmount.displayValue;
        console.log("✅ Owned token amount: ", ownedAmount);
        const percent70 = Number(ownedAmount)/100 * 70;
        await token.transfer(vote.getAddress(),percent70);
        console.log("✅ 70% of tokens "+percent70+" transferred to voting contract!! ");

    }
    catch (error) {
        console.log("Could not transfer token to voting contract", error);
    }
})();
