import { ethers } from 'ethers';
import erc721Abi from './abi/erc721-abi.json';
import to from 'await-to-js';

export class EtherErc721Util {
	private contractAddress: string;
	private abi = erc721Abi;

	constructor(contractAddress: string) {
		this.contractAddress = contractAddress;
	}

	async getMintPrice(signer: ethers.JsonRpcSigner): Promise<string> {
		const contract = new ethers.Contract(
			this.contractAddress,
			this.abi,
			signer
		);

		let [err, result] = await to(contract.mintPrice());

		if (err) {
			// error handle here
			console.log('handle:', err);

			// return default value or empty value
			return '0';
		}

		return ethers.formatEther(result!.toString());
	}

	async mint(price: string, quantity: number): Promise<string> {
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
		const contract = new ethers.Contract(
			this.contractAddress,
			this.abi,
			signer
		);

		const [err, tx] = await to(
			contract.mint(signer.address, quantity.toString(), {
				to: contract.address,
				value: ethers.parseUnits(price, 'ether')
			})
		);

		if (err) {
			// error handle here
			console.log('hanlde:', err);

			// return default value or empty value
			return '';
		}

		console.log('ttxx', tx);

		return tx.hash;
	}
}
