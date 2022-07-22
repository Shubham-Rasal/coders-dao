import React, { useEffect, useState } from 'react'
import { useVote } from '@thirdweb-dev/react'

const Proposals = ({ hasClaimedNFT, address }) => {

    const vote = useVote("0x76541e3A08949F5b56EAAAC21407220340bF3B93");
    const [isVoting, setIsVoting] = useState(false);
    const [proposals, setProposals] = useState([]);
    const [hasVoted, setHasVoted] = useState(false);
    const [voteColor, setVoteColor] = useState({
        "0": "hover:bg-red-400",
        "1": "hover:bg-green-400",
        "2": "hover:bg-gray-400",
    })

    const [voteText, setVoteText] = useState("");
  const [votes, setVotes] = useState([])

    const state = {
        "0":"Active",
        "1":"Cancelled",
        "3":"Defeated",
        "4":"Succceded",       

    }

    Object.freeze(state);
    console.log(state[0]);

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



    function handleOnVote(vote,proposal){
        // vote.preventDefault();
        const id= proposal.proposalId;
        const voteType = vote.type;
        const voteObj = {
            proposalId:id,
            voteType:voteType,
        }
        setVotes([...votes,voteObj]);
        console.log(vote)
        setVoteText("✅");
        console.log(votes)
  
    }


    return (
        <div>
            <h1 className='font-bold'>  Proposals</h1>

            <div className="bg-blue-200">
                {proposals.map((proposal,index) => {

                    console.log(proposal);
                    return (
                        <div className="flex flex-col " key={index}>
                            <div className="flex bg-yellow-200">

                                <strong> Proposer:  </strong>
                                <div className="font-light ml-3 ">
                                    {proposal.proposer}
                                </div>
                            </div>

                            <div className="des p-3">
                                {proposal.description}
                                <div className="bg-red-600 rounded-full flex justify-center">
                                {state[proposal.state]}

                                </div>
                            </div>
                            <div className="options flex ">
                                {proposal.votes.map((vote, index) => {
                                    return (
                                        <div className={`bg-red-100 m-4 p-2 w-full text-center font-medium rounded-full ${voteColor[vote.type]} vote-btn`} key={index}>
                                           <input type="checkbox" className='w-full rounded-lg ' name={vote.label} onClick={()=>handleOnVote(vote,proposal)}/>
                                            {vote.label}{voteText}
                                         
                                            </div>
                                    )
                                })
                                }



                            </div>
                        </div>
                    )


                })}
            </div>
              {proposals.length &&
            <div className="submit p-2 m-8 flex justify-center">
                <button disabled={isVoting || hasVoted} className='bg-slate-900 text-gray-50 p-3  rounded-md'>
                {isVoting
                  ? "Voting..."
                  : hasVoted
                    ? "You Already Voted"
                    : "Submit Votes"}</button>
            </div>

                }

        </div>
    )
}

export default Proposals