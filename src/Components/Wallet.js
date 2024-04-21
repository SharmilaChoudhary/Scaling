
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { arbitrum, mainnet , gnosis } from 'wagmi/chains'

import ConnectButton from './ConnectButton';



// 1. Get projectId
const projectId = '94f5381dbedb7ce325077496a593fc4b'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum, gnosis]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })


function Wallet() {
  return (
    <WagmiConfig config={wagmiConfig}>
   <p className='text-white m-3 '>Shamixx</p>
      <ConnectButton/>
    </WagmiConfig>
  );
}

export default Wallet;
