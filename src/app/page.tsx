'use client'; // This is a client component 👈🏽
import { EtherErc721Util } from '@/util/erther-erc721.util';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export default function Home() {
	const [balance, setBalance] = useState('0');
	const [mintPrice, setMintPrice] = useState('0');
	// boolean
	const [isConnected, setIsConnected] = useState(false);
	const [hasMetamask, setHasMetamask] = useState(false);
	// signer related
	const [walletAddress, setWalletAddress] = useState<string | null>(null);
	const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
	// quantity
	const [quantity, setQuantity] = useState(0);
	useEffect(() => {
		if (typeof window.ethereum !== 'undefined') {
			setHasMetamask(true);
		}
	}, []);

	// style
	const div = '';
	const buttonEnable =
		'border rounded-md cursor-pointer px-2 py-2 m-2 bg-blue-600 text-white';
	const buttonDisable =
		'border rounded-md cursor-pointer px-2 py-2 m-2 bg-grey-600 text-white';

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

	async function getMintPrice() {
		if (!!signer) {
			const contractAddress = '0x7C40280cd549883977326E4c041aAC518D7AD4f8';
			const etherUtil = new EtherErc721Util(contractAddress);
			const res = await etherUtil.getMintPrice(signer);
			setMintPrice(res);
		}
	}

	async function mint() {
		if (!!signer && !!mintPrice) {
			const contractAddress = '0x7C40280cd549883977326E4c041aAC518D7AD4f8';
			const etherUtil = new EtherErc721Util(contractAddress);
			const res = await etherUtil.mint(mintPrice, quantity);
			console.log(res);
		} else {
			console.log('signer or mintPrice is not available');
		}
	}
	//increase counter
	const increase = () => {
		setQuantity((count) => count + 1);
	};

	//decrease counter
	const decrease = () => {
		setQuantity((count) => count - 1);
	};

	//reset counter
	const reset = () => {
		setQuantity(0);
	};

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

				<div className="flex items-center justify-center w-full mt-4">
					{walletAddress ? (
						<div>Mint-Price: ${mintPrice.toString()}</div>
					) : (
						<></>
					)}

					{isConnected ? (
						<button className={buttonEnable} onClick={getMintPrice}>
							Get-Mint-Price
						</button>
					) : (
						<></>
					)}
				</div>

				{isConnected && mintPrice == '0' ? (
					<div className="text-red-500 my-2">
						Please get mint-price before mint
					</div>
				) : (
					<></>
				)}

				{isConnected && mintPrice != '0' ? (
					<div className="flex items-center justify-center w-full my-2">
						<div className="btn__container">
							<button className={buttonEnable} onClick={increase}>
								+
							</button>
							<span className="m-auto p-auto w-10">{quantity}</span>
							<button
								disabled={quantity === 0}
								className={quantity === 0 ? buttonDisable : buttonEnable}
								onClick={decrease}
							>
								-
							</button>
						</div>
						<button
							disabled={quantity === 0 || mintPrice === '0'}
							className={
								quantity === 0 || mintPrice === '0'
									? buttonDisable
									: buttonEnable
							}
							onClick={mint}
						>
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
