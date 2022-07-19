import { useMetamask ,useAddress} from '@thirdweb-dev/react'
import { useState } from 'react'
import './index.css'
function App() {


  const userAddress = useAddress();

  const connectWithMetamask = useMetamask();

  console.log(userAddress);
  


  return (
    <div className="App">
       {userAddress ? (
        <h4>Connected as {userAddress}</h4>
        
      ) : (
        <button onClick={connectWithMetamask} className=' bg-green-400 p-2 rounded-md'>Connect Metamask Wallet</button>
      )}
  
    </div>
  )
}

export default App
