import to from 'await-to-js';
import { ethers } from 'ethers';
import erc721Abi from './abi/erc721-abi.json';

export class EtherErc721Util {
	private contractAddress: string;
	private abi = erc721Abi;

	constructor(contractAddress: string) {
		this.contractAddress = contractAddress;
	}

	async mint(): Promise<string> {
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
		const contract = new ethers.Contract(
			this.contractAddress,
			this.abi,
			signer
		);

		const [err, tx] = await to(contract.mint());

		if (err) {
			// error handle here
			console.log('hanlde error:', err);

			// return default value or empty value
			return '';
		}

		console.log('tx object:', tx);

		return tx.hash;
	}
}
