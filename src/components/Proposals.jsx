import React, { useEffect, useState } from 'react'
import { useVote } from '@thirdweb-dev/react'

const Proposals = ({ hasClaimedNFT, address }) => {

    const vote = useVote("0x76541e3A08949F5b56EAAAC21407220340bF3B93");
    const [isVoting, setIsVoting] = useState(false);
    const [proposals, setProposals] = useState([]);
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        if (!hasClaimedNFT)
            return;

        const getAllProposals = async () => {
            try {
                const proposals = await vote.getAll();
                console.log("proposals", proposals);
                setProposals(proposals);

            } catch (error) {
                console.error("Could not get all proposals", error);
            }
        }

        getAllProposals();
    }, [hasClaimedNFT, vote]);

    useEffect(() => {
        if (!hasClaimedNFT)
            return;
        if (!proposals.length)
            return;
        //check if the user has voted
        const checkIfVoted = async () => {
            try {
                const hasVoted = await vote.hasVoted(proposals[0].proposalId, address);
                setHasVoted(hasVoted);
            } catch (error) {
                console.log("Could not check if voted", error);
            }
        }
        checkIfVoted();
    }, [hasClaimedNFT, address, vote]);



    return (
        <div>
            <h1 className='font-bold'>  Proposals</h1>

            <div className="">
                {proposals.map((proposal) => {

                    console.log(proposal);
                    return (
                        <div className="flex flex-col ">
                            <div className="flex bg-yellow-300">

                            <strong> Proposer:  </strong>
                         <div className="font-light ml-3 ">
                            {proposal.proposer}
                         </div>
                            </div>

                           

                            <div className="des p-3">
                                {proposal.description}
                            </div>
                        </div>
                    )


                })}
            </div>


        </div>
    )
}

export default Proposals