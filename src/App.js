
import { BigNumber } from 'ethers';
import "./App.css";
import * as React from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import  { useState ,useEffect } from 'react';
import Wallet from './Components/Wallet';
import { IDKitWidget, CredentialType } from '@worldcoin/idkit';


import HomePageContents from "./Pages/HomePageContents";
// https://youtube.com/shorts/ESfDVsjJKtM?feature=share

const ethers = require('ethers');



// Replace with your Ethereum provider URL and private key
 let yourProviderURL = {mumbai:'https://polygon-mumbai.g.alchemy.com/v2/02Hj_R2P406cm0c95ENbqq_PECBbhpJg',
                        sepolia:'https://scroll-sepolia.blockpi.network/v1/rpc/public',
                        mantle:'https://rpc.testnet.mantle.xyz',
                        scroll:'https://scroll-sepolia.blockpi.network/v1/rpc/public',
                        gnosis:'https://rpc.ankr.com/gnosis',
                        chiliz:'https://spicy-rpc.chiliz.com/',
                        arbitrum:'https://arbitrum-sepolia.blockpi.network/v1/rpc/public'
                       };

 // Replace with your Ethereum provider URL
const yourPrivateKey = '4c4dc9b4edbb8c4430e782db0ba161a38a1a705d9a246ac6c16d937bd73d35fd'; // Replace with your private key
const Contractaddress = '0xA6488CB7BBd8Cc3F4a7081e2c375579AAE1814FB';
async function deployContract(abi,bytecode,network) {
  
 
  const provider = new ethers.providers.JsonRpcProvider(network);
  const wallet = new ethers.Wallet(yourPrivateKey, provider);
  // const signer = await provider.getSigner();
  // const address = await signer.getAddress();
  const contractFactory = new ethers.ContractFactory(abi, bytecode , wallet);
  // const contract = new ethers.Contract(Contractaddress, abi, signer);
  try {
    const contract = await contractFactory.deploy();
    await contract.deployed();

    console.log('Contract deployed at address:', contract.address);
  } catch (error) {
    console.error('Contract deployment failed:', error);
  }
}
function App() {
  const [showMessage, setShowMessage] = useState();
  const [hideWorldCoin, setHideWorldCoin] = useState(false);
  // const [proof, setProof] = useState<ISuccessResult | null>(null)
  const handleProof = (result) => {
    // setProof(result);
    console.log(result);
  };
  const onSuccess = async () => {
    // await contract.verifyAndExecute(
    //   address,
    //   proof?.merkle_root
    //     ? decode < BigNumber > ('uint256', proof?.merkle_root ?? '')
    //     : BigNumber.from(0),
    //   proof?.nullifier_hash
    //     ? decode < BigNumber > ('uint256', proof?.nullifier_hash ?? '')
    //     : BigNumber.from(0),
    //   proof?.proof
    //     ? decode <
    //         [
    //           BigNumber,
    //           BigNumber,
    //           BigNumber,
    //           BigNumber,
    //           BigNumber,
    //           BigNumber,
    //           BigNumber,
    //           BigNumber,
    //         ] >
    //         ('uint256[8]', proof?.proof ?? '')
    //     : [
    //         BigNumber.from(0),
    //         BigNumber.from(0),
    //         BigNumber.from(0),
    //         BigNumber.from(0),
    //         BigNumber.from(0),
    //         BigNumber.from(0),
    //         BigNumber.from(0),
    //         BigNumber.from(0),
    //       ]
    // );
    // setHideWorldCoin(true);
    
  };

  const [abi, setAbi] = useState();
  const [bytecode, setBytecode] = useState('');
  const [networks, setNetworks] = useState({
    mumbai: false,
    polygon: false,
    sepolia:false,
    scroll:false,
    gnosis:false,
    chiliz:false,
    arbitrum:false,
    mantle:false

  });
  const [deploymentStatus,setDeploymentStatus]=useState({})

  const handleNetworkSelection = (network) => {
    setNetworks({
      ...networks,
      [network]: !networks[network],
    });
  };
const Abii= [
  {
    "inputs": [],
    "name": "retrieve",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "num",
        "type": "uint256"
      }
    ],
    "name": "store",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
  const handleSubmit = () => {
    // Your submit logic goes here
    setShowMessage('Compiled');
    setAbi(Abii);
    setBytecode('608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632e64cec11461003b5780636057361d14610059575b600080fd5b610043610075565b60405161005091906100a1565b60405180910390f35b610073600480360381019061006e91906100ed565b61007e565b005b60008054905090565b8060008190555050565b6000819050919050565b61009b81610088565b82525050565b60006020820190506100b66000830184610092565b92915050565b600080fd5b6100ca81610088565b81146100d557600080fd5b50565b6000813590506100e7816100c1565b92915050565b600060208284031215610103576101026100bc565b5b6000610111848285016100d8565b9150509291505056fea2646970667358221220322c78243e61b783558509c9cc22cb8493dde6925aa5e89a08cdf6e22f279ef164736f6c63430008120033')
  };
  useEffect(() => {
    const deployToNetworks = async () => {
      const networksToDeploy = Object.keys(networks).filter((network) => networks[network]);

      networksToDeploy.forEach(async (net) => {
        const status = await deployContract(abi, bytecode, yourProviderURL[net]);
        setDeploymentStatus((prevStatus) => prevStatus + '\n' + status);
      });

      // for (const net of networksToDeploy) {
      //   const status = await deployContract(abi, bytecode, yourProviderURL.net);
      //   setDeploymentStatus((prevStatus) => prevStatus + '\n' + status);
      // }


    };

    deployToNetworks();
  }, [abi, bytecode, networks]);
  return (
    <div>
      


<aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul className="space-y-2 font-medium">

        <li>
        <Wallet/> </li>
        <br></br>
        <li>{!hideWorldCoin && (
              <div className="flex self-center">
                <IDKitWidget
                  action="my_action"
              
                  onSuccess={onSuccess}
                  credential_types={[CredentialType.Orb]}
                  handleVerify={handleProof}
                  app_id="app_staging_827fb01f4f686aa7176b83d2e3cdc3b3">
                  {({ open }) => (
                    <button
                      style={{
                        marginRight: '30px',
                        border: '1px solid white', // Replace #000 with your desired border color
                        padding: '10px 20px', // Add some padding to make the button look better
                        borderRadius: '5px', // Optionally, add some border-radius for rounded corners
                      }}
                      className="btn btn-primary btn-sm text-white"
                      onClick={open}>
                      Signin and Verify with world coin 
                      ID
                    </button>
                  )}
                </IDKitWidget>
              </div>
            )}</li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
            </a>
         </li>
      </ul>
   </div>
</aside>

<div className="p-4 sm:ml-64">
   <div className="p-4 border-2  border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      
   <div className="w-full ">
  <div className="relative w-full min-w-[400px]">
    <textarea
      className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
      placeholder=" "
    >
         
    </textarea>
  
    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
      Message

      
    </label>
  


  </div>
  <button onClick={handleSubmit} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">
        Submit
      </button>
 <p>{showMessage}</p>
</div>

<div>
        <h2>Select Blockchain Networks:</h2>
        <label>
          <input
            type="checkbox"
            checked={networks.mumbai}
            onChange={() => handleNetworkSelection('mumbai')}
          /> Mumbai
        </label>
        <label>
          <input
            type="checkbox"
            checked={networks.mantle}
            onChange={() => handleNetworkSelection('mantle')}
          /> Mantle
        </label>
       
        <label>
          <input
            type="checkbox"
            checked={networks.sepolia}
            onChange={() => handleNetworkSelection('sepolia')}
          /> Sepolia
        </label>

        
        <label>
          <input
            type="checkbox"
            checked={networks.scroll}
            onChange={() => handleNetworkSelection('scroll')}
          /> Scroll
        </label>

        
        <label>
          <input
            type="checkbox"
            checked={networks.gnosis}
            onChange={() => handleNetworkSelection('gnosis')}
          /> Gnosis
        </label>

        <label>
          <input
            type="checkbox"
            checked={networks.gnosis}
            onChange={() => handleNetworkSelection('chiliz')}
          /> Chiliz
        </label>
        <label>
          <input
            type="checkbox"
            checked={networks.arbitrum}
            onChange={() => handleNetworkSelection('arbitrum')}
          /> arbitrum
        </label>
      </div> 
</div>

    </div>
    </div>
    
  );
}

export default App;
