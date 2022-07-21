import sdk from "./initialize-sdk.js";

(async () => {


    try {


        const metadata = {
            name: "Let the code rule",
            proposal_token_threshold: 0,
            voting_period_in_blocks: 10,
            voting_delay_in_blocks: 1,
            voting_token_address:process.env.TOKEN_ADDRESS,
            voting_quorum_fraction: 0,
        }
    
    
        const voteAddress = await sdk.deployer.deployVote(metadata);

        console.log("✅ Voting contract deployed!! The contract address is: ", voteAddress);

    } catch (error) {
        console.log("Could not deploy vote contract", error);
    }
    
    
})();