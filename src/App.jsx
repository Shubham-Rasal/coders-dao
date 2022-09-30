import { useMetamask, useAddress, useEditionDrop, useNetwork } from '@thirdweb-dev/react'
import { useState, useEffect } from 'react'
import Members from './components/Members';
import Proposals from './components/Proposals';
import {ChainId} from '@thirdweb-dev/sdk'
import './index.css'

function App() {


  const userAddress = useAddress();
  const connectWithMetamask = useMetamask();
  const network =useNetwork()
  const editionDrop = useEditionDrop("0x2f5BA3EcCB87d9ce6F6808661E70f7E5455A6ccb")


  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  // isClaiming lets us easily keep a loading state while the NFT is minting.
  const [isClaiming, setIsClaiming] = useState(false);



  useEffect(() => {
    // If they don't have an connected wallet, exit!
    if (!userAddress) {
      return;
    }
    const checkBalance = async () => {
      try {

        const balance = await editionDrop.balanceOf(userAddress, 0);
        // console.log("Balance:", balance.gt(0));
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!");
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.");
        }
      } catch (error) {
        console.log("Could not get balance", error);
      }
    }

    checkBalance();

  }, [userAddress, editionDrop]);

  const mintNft = async () => {
    try {
      setIsClaiming(true);
      await editionDrop.claim("0", 1);
      console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
      setHasClaimedNFT(true);
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("Failed to mint NFT", error);
    } finally {
      setIsClaiming(false);
    }
  };


  console.log("Address:", userAddress);

  if (!userAddress) {
    return (
      <button onClick={connectWithMetamask} className=' bg-green-400  rounded-md p-3'>Connect Metamask Wallet</button>
    )
  }


  if (network?.[0].data.chain.id !== ChainId.Rinkeby) {
    return (
      <div className="unsupported-network">
        <h2>Please connect to Rinkeby</h2>
        <p>
          This dapp only works on the Rinkeby network, please switch networks
          in your connected wallet.
        </p>
      </div>
    );
  }

  if (!hasClaimedNFT) {
    return (<div className=" h-3/5 flex justify-center items-center bg-slate-300">
      <h5 className='p-2 bg-green-300 m-1 rounded '>Connected as {userAddress}</h5>
      <button className="h-20  bg-blue-700 text-center w-3/6 rounded-full align-middle " disabled={isClaiming} onClick={mintNft}>
        {isClaiming ? "Claiming..." : "Mint nft for free 👩‍💻"}
      </button>
    </div>)
  }
  else {
    return (
      <div className="App flex flex-col h-screen align-center">
        <h5 className='p-2 bg-green-300 m-1 rounded '>Connected as {userAddress}</h5>
        <div className="bg-red-400 p-2 m-2 ">
          <h3>Welcome to coder's DAO</h3>
        </div>
        <div className="members p-2 m-2 bg-teal-500">
          <Members nft={{ hasClaimedNFT, setHasClaimedNFT }} />
        </div>
        <div className="proposals">
          <Proposals hasClaimedNFT={hasClaimedNFT} address={userAddress}/>
        </div>

      </div>
    )
  }
}

export default App
