import { ethers } from "ethers";
import sdk from "./initialize-sdk.js";

const vote = sdk.getVote(process.env.VOTING_CONTRACT_ADDRESS);
const token = sdk.getToken("0x925F1c186140996cAb95400Ce9Fc83B4293809Bc");


(async () => {

    //Proposal to mint tokens
    try {
        const amount = 388_000;
        const description = "Should we mint" + amount + " tokens into the treasury?";
        const executions = [
            {
                toAddress: token.getAddress(),
                nativeTokenValue: 0,
                transactionData: token.encoder.encode("mintTo", [
                    vote.getAddress(),
                    ethers.utils.parseUnits(amount.toString(), 18),
                ]),
            }
        ]

        await vote.propose(description, executions);
        console.log("✅ Proposal to mint tokens created!! ");
    } catch (error) {
        console.log("Could not create proposal to mint coins.", error);
        process.exit(1);
    }
    //Proposal to transfer tokens
    try {
        const amount = 7_000;
        const description = "Should we transfer" + amount + " tokens to" + process.env.WALLET_ADD + "for being awesome ?";
        const executions = [
            {
                nativeTokenValue: 0,
                transactionData: token.encoder.encode("transfer", [
                    process.env.WALLET_ADD,
                    ethers.utils.parseUnits(amount.toString(), 18),
                ]),
                toAddress: token.getAddress(),

            }
        ]

        await vote.propose(description, executions);
        console.log("✅ Proposal to transfer tokens created!! ");
    }
    catch (error) {
        console.log("Could not create proposal to transfer tokens.", error);
    }
})();