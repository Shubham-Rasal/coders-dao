import React, { useEffect, useMemo, useState } from 'react'

import { useToken, useEditionDrop } from '@thirdweb-dev/react'

const Members = ({ nft }) => {

    // console.log("nft", nft)

    const [members, setMembers] = React.useState([]);
    const [memberTokenAmounts, setMemberTokenAmounts] = useState([])
    const editionDrop = useEditionDrop("0x2f5BA3EcCB87d9ce6F6808661E70f7E5455A6ccb")
    const token = useToken("0x925F1c186140996cAb95400Ce9Fc83B4293809Bc");


    const shortenAddress = (address) => {
        return address.substring(0, 6) + "..." + address.substring(address.length - 4, address.length);
    }
    //get all members
    useEffect(() => {
        if (!nft.hasClaimedNFT)
            return;


        const getAllAddresses = async () => {
            try {
                const claimedWalletAddresses = await editionDrop.history.getAllClaimerAddresses(0);
                setMembers(claimedWalletAddresses);
                console.log("claimesWalletAddresses", claimedWalletAddresses);
            } catch (error) {
                console.log("Could not get all addresses", error);
            }
        }
        getAllAddresses();
        console.log("members", members);

    }, [nft.hasClaimedNFT, editionDrop.history]);

    //get all token amounts for each member
    useEffect(() => {
        if (!nft.hasClaimedNFT)
                   return;
        const getBalances = async () => {
            try {
                const balances = await token.history.getAllHolderBalances()
                setMemberTokenAmounts(balances)
                console.log("balances", balances);
            } catch (error) {
                console.log("Could not get balances", error);
            }
        }
        getBalances();
    },[nft.hasClaimedNFT, token.history]);

//combining members and token amounts
const memberList = useMemo(() => {
    return members.map((address) => {
       
        const member = memberTokenAmounts.find(({holder}) => holder === address)

        return {
            address,
            tokenAmount:member?.balance.displayValue||"0"
    }
    }
    )}
, [members, memberTokenAmounts])



    return (
        <div>
            <h2 className='font-bold'>Members</h2><br />
            <div className="flex flex-col">
            <div  className='flex w-full bg-cyan-600 tx-lg font-bold h-12 justify-between'>
                            <h2>Address</h2>
                            <p>Token Amount (in CUT)</p>
                          
            </div>

            {

                memberList.map(({address, tokenAmount}) => {
                    return (
                        <div key={address} className='flex w-full bg-cyan-300 hover:bg-cyan-500 tx-lg h-12 justify-between'>
                            <h5>{shortenAddress(address)}</h5>
                            <p>{tokenAmount}</p>
                          
                        </div>
                    )
                    
                }
                )
            }
            </div>
        </div>
    )
}

export default Members