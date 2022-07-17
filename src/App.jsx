import { useMetamask ,useAddress} from '@thirdweb-dev/react'
import { useState } from 'react'
import './index.css'
function App() {


  const userAddress = useAddress();

  const connectWithMetamask = useMetamask();

  console.log(userAddress);

  if (!userAddress) {
    return (
      <div className="landing">
        <h1>Welcome to NarutoDAO</h1>
        <button onClick={connectWithMetamask} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    );


}

}

export default App
