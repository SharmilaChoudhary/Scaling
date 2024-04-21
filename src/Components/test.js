 import {useState, useCallback } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react'
import Web3Modal from 'web3modal';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { IDKitWidget,  ISuccessResult, CredentialType } from '@worldcoin/idkit';
import { BigNumber, ethers } from 'ethers';
import { decode } from './wld.ts';
const navigation = [
  { name: 'Set Preferences', href: '/preferences' },
  { name: 'Send Assets', href: '/assets' },
];
const abi =[
	{
		"inputs": [
			{
				"internalType": "contract IWorldID",
				"name": "_worldId",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_appId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_actionId",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "InvalidNullifier",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "signal",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "root",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "nullifierHash",
				"type": "uint256"
			},
			{
				"internalType": "uint256[8]",
				"name": "proof",
				"type": "uint256[8]"
			}
		],
		"name": "verifyAndExecute",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const Contractaddress = '0xA6488CB7BBd8Cc3F4a7081e2c375579AAE1814FB';
const web3Modal = new Web3Modal();
const connection = await web3Modal.connect();
const provider = new ethers.providers.Web3Provider(connection);
const signer = await provider.getSigner();
const address = await signer.getAddress();
const contract = new ethers.Contract(Contractaddress, abi, signer);
export default function HomePage({ pageContents: Content }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hideWorldCoin, setHideWorldCoin] = useState(false);
  const [proof, setProof] = useState<ISuccessResult | null>(null)
  const { open } = useWeb3Modal();
  // const handleProof = useCallback((result) => {
  //   return new ((resolve) => {
  //     console.log('The result after verification is : ', result);
  //     setTimeout(() => {
  //       resolve();
  //     }, 1000);
  //     // NOTE: Example of how to decline the verification request and show an error message to the user
  //   })();
  // }, []);
  const handleProof = (result) => {
    setProof(result);
    console.log(result);
  };
  const onSuccess = async () => {
    await contract.verifyAndExecute(
      address,
      proof?.merkle_root
        ? decode < BigNumber > ('uint256', proof?.merkle_root ?? '')
        : BigNumber.from(0),
      proof?.nullifier_hash
        ? decode < BigNumber > ('uint256', proof?.nullifier_hash ?? '')
        : BigNumber.from(0),
      proof?.proof
        ? decode <
            [
              BigNumber,
              BigNumber,
              BigNumber,
              BigNumber,
              BigNumber,
              BigNumber,
              BigNumber,
              BigNumber,
            ] >
            ('uint256[8]', proof?.proof ?? '')
        : [
            BigNumber.from(0),
            BigNumber.from(0),
            BigNumber.from(0),
            BigNumber.from(0),
            BigNumber.from(0),
            BigNumber.from(0),
            BigNumber.from(0),
            BigNumber.from(0),
          ]
    );
    setHideWorldCoin(true);
    
  };
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global">
          <div className="flex lg:flex-1">
            <a
              href="#"
              className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}>
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                className="h-6 w-6"
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {!hideWorldCoin && (
              <div className="flex self-center">
                <IDKitWidget
                  action="my_action"
                  signal={address}
                  onSuccess={onSuccess}
                  credential_types={[CredentialType.Orb]}
                  handleVerify={handleProof}
                  app_id="app_staging_0b150dd450c76fcaa2d8b4c21ac9ec32">
                  {({ open }) => (
                    <button
                      style={{
                        marginRight: '30px',
                        border: '1px solid #000', // Replace #000 with your desired border color
                        padding: '10px 20px', // Add some padding to make the button look better
                        borderRadius: '5px', // Optionally, add some border-radius for rounded corners
                      }}
                      className="btn btn-primary btn-sm text-black"
                      onClick={open}>
                      Connect with world coin
                    </button>
                  )}
                </IDKitWidget>
              </div>
            )}
            <w3m-button />
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a
                href="#"
                className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&…
[9:20 pm, 18/11/2023] Kenil Shah: {!hideWorldCoin && (
              <div className="flex self-center">
                <IDKitWidget
                  action="my_action"
                  signal={address}
                  onSuccess={onSuccess}
                  credential_types={[CredentialType.Orb]}
                  handleVerify={handleProof}
                  app_id="app_staging_0b150dd450c76fcaa2d8b4c21ac9ec32">
                  {({ open }) => (
                    <button
                      style={{
                        marginRight: '30px',
                        border: '1px solid #000', // Replace #000 with your desired border color
                        padding: '10px 20px', // Add some padding to make the button look better
                        borderRadius: '5px', // Optionally, add some border-radius for rounded corners
                      }}
                      className="btn btn-primary btn-sm text-black"
                      onClick={open}>
                      Connect with world coin
                    </button>
                  )}
                </IDKitWidget>
              </div>
            )}