'use client'; // This is a client component 👈🏽
import { EtherErc721Util } from '@/util/erther-erc721.util';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export default function Home() {
	const [balance, setBalance] = useState('0');
	// boolean
	const [isConnected, setIsConnected] = useState(false);
	const [hasMetamask, setHasMetamask] = useState(false);
	// signer related
	const [walletAddress, setWalletAddress] = useState<string | null>(null);
	const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
	useEffect(() => {
		if (typeof window.ethereum !== 'undefined') {
			setHasMetamask(true);
		}
	}, []);

	// style
	const buttonEnable =
		'border rounded-md cursor-pointer px-2 py-2 m-2 bg-blue-600 text-white';

	async function connect() {
		if (typeof window.ethereum !== 'undefined') {
			try {
				await window.ethereum.request({ method: 'eth_requestAccounts' });
				setIsConnected(true);
				const provider = new ethers.BrowserProvider(window.ethereum);
				const signer = await provider.getSigner();
				setSigner(signer);
				setWalletAddress(signer.address);
			} catch (e) {
				console.log(e);
			}
		} else {
			setIsConnected(false);
		}
	}

	async function getBalance() {
		if (!!signer) {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const balance = await provider.getBalance(signer);
			console.log(balance);
			if (balance > 0) {
				setBalance(ethers.formatEther(balance));
				return balance;
			}
		}
	}

	async function mint() {
		if (!!signer) {
			const contractAddress = '0x6D2D4BF2FD87418d3A3e610bCa620082717fFF3B';
			const etherUtil = new EtherErc721Util(contractAddress);
			const res = await etherUtil.mint();
			console.log(res);
		} else {
			console.log('signer or mintPrice is not available');
		}
	}

	return (
		<div className="bg-slate-800 h-screen flex items-center justify-center text-white">
			<div className="flex flex-col items-center justify-center ">
				<div className="p-10">
					{hasMetamask ? (
						isConnected ? (
							'Connected! '
						) : (
							<button className={buttonEnable} onClick={() => connect()}>
								Connect
							</button>
						)
					) : (
						'Please install metamask'
					)}
				</div>

				<div className="flex flex-col items-center justify-center w-full">
					{walletAddress ? (
						<p className="mr-auto">Your WalletAddres: {walletAddress}</p>
					) : (
						''
					)}

					<div className="m-auto mt-5 flex items-center">
						{walletAddress ? (
							<div>Your Balance: ${balance.toString()} </div>
						) : (
							<></>
						)}

						{isConnected ? (
							<button className={buttonEnable} onClick={getBalance}>
								Get-Balance
							</button>
						) : (
							<></>
						)}
					</div>
				</div>

				{isConnected ? (
					<div className="flex items-center justify-center w-full my-2">
						<button className={buttonEnable} onClick={mint}>
							Mint
						</button>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
