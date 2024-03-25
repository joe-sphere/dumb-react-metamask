import BigNumber from 'bignumber.js';
import BN from 'bn.js';
import {
	EventData,
	EventResponse,
	PromiEvent,
	TransactionReceipt,
	Web3ContractContext
} from 'ethereum-abi-types-generator';

export interface CallOptions {
	from?: string;
	gasPrice?: string;
	gas?: number;
}

export interface SendOptions {
	from: string;
	value?: number | string | BN | BigNumber;
	gasPrice?: string;
	gas?: number;
}

export interface EstimateGasOptions {
	from?: string;
	value?: number | string | BN | BigNumber;
	gas?: number;
}

export interface MintOption {
	gasPirce?: string;
	gasLimit?: string;
	value?: string;
}

export interface MethodPayableReturnContext {
	send(options: SendOptions): PromiEvent<TransactionReceipt>;
	send(
		options: SendOptions,
		callback: (error: Error, result: any) => void
	): PromiEvent<TransactionReceipt>;
	estimateGas(options: EstimateGasOptions): Promise<number>;
	estimateGas(
		options: EstimateGasOptions,
		callback: (error: Error, result: any) => void
	): Promise<number>;
	encodeABI(): string;
}

export interface MethodConstantReturnContext<TCallReturn> {
	call(): Promise<TCallReturn>;
	call(options: CallOptions): Promise<TCallReturn>;
	call(
		options: CallOptions,
		callback: (error: Error, result: TCallReturn) => void
	): Promise<TCallReturn>;
	encodeABI(): string;
}

export interface MethodReturnContext extends MethodPayableReturnContext {}

export type ContractContext = Web3ContractContext<
	ReleaseYourUltra,
	ReleaseYourUltraMethodNames,
	ReleaseYourUltraEventsContext,
	ReleaseYourUltraEvents
>;
export type ReleaseYourUltraEvents =
	| 'Approval'
	| 'ApprovalForAll'
	| 'ConsecutiveTransfer'
	| 'OwnershipTransferred'
	| 'Transfer';
export interface ReleaseYourUltraEventsContext {
	Approval(
		parameters: {
			filter?: {
				owner?: string | string[];
				approved?: string | string[];
				tokenId?: string | string[];
			};
			fromBlock?: number;
			toBlock?: 'latest' | number;
			topics?: string[];
		},
		callback?: (error: Error, event: EventData) => void
	): EventResponse;
	ApprovalForAll(
		parameters: {
			filter?: { owner?: string | string[]; operator?: string | string[] };
			fromBlock?: number;
			toBlock?: 'latest' | number;
			topics?: string[];
		},
		callback?: (error: Error, event: EventData) => void
	): EventResponse;
	ConsecutiveTransfer(
		parameters: {
			filter?: {
				fromTokenId?: string | string[];
				from?: string | string[];
				to?: string | string[];
			};
			fromBlock?: number;
			toBlock?: 'latest' | number;
			topics?: string[];
		},
		callback?: (error: Error, event: EventData) => void
	): EventResponse;
	OwnershipTransferred(
		parameters: {
			filter?: {
				previousOwner?: string | string[];
				newOwner?: string | string[];
			};
			fromBlock?: number;
			toBlock?: 'latest' | number;
			topics?: string[];
		},
		callback?: (error: Error, event: EventData) => void
	): EventResponse;
	Transfer(
		parameters: {
			filter?: {
				from?: string | string[];
				to?: string | string[];
				tokenId?: string | string[];
			};
			fromBlock?: number;
			toBlock?: 'latest' | number;
			topics?: string[];
		},
		callback?: (error: Error, event: EventData) => void
	): EventResponse;
}
export type ReleaseYourUltraMethodNames =
	| 'new'
	| 'approve'
	| 'balanceOf'
	| 'freeMint'
	| 'freeMintList'
	| 'getApproved'
	| 'isApprovedForAll'
	| 'isMintStart'
	| 'maxSupply'
	| 'mint'
	| 'mintPrice'
	| 'mintStartTime'
	| 'name'
	| 'owner'
	| 'ownerOf'
	| 'renounceOwnership'
	| 'safeTransferFrom'
	| 'safeTransferFrom'
	| 'setApprovalForAll'
	| 'setBaseURI'
	| 'setFreeMint'
	| 'setMintPrice'
	| 'setMintStartTime'
	| 'supportsInterface'
	| 'symbol'
	| 'tokenURI'
	| 'totalSupply'
	| 'transferFrom'
	| 'transferOwnership'
	| 'withdraw';
export interface ApprovalEventEmittedResponse {
	owner: string;
	approved: string;
	tokenId: string;
}
export interface ApprovalForAllEventEmittedResponse {
	owner: string;
	operator: string;
	approved: boolean;
}
export interface ConsecutiveTransferEventEmittedResponse {
	fromTokenId: string;
	toTokenId: string;
	from: string;
	to: string;
}
export interface OwnershipTransferredEventEmittedResponse {
	previousOwner: string;
	newOwner: string;
}
export interface TransferEventEmittedResponse {
	from: string;
	to: string;
	tokenId: string;
}
export interface ReleaseYourUltra {
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: constructor
	 * @param initialOwner Type: address, Indexed: false
	 * @param maxSupply_ Type: uint256, Indexed: false
	 * @param mintPrice_ Type: uint256, Indexed: false
	 * @param mintStartTime_ Type: uint256, Indexed: false
	 * @param baseURI_ Type: string, Indexed: false
	 */
	'new'(
		initialOwner: string,
		maxSupply_: string,
		mintPrice_: string,
		mintStartTime_: string,
		baseURI_: string
	): MethodReturnContext;
	/**
	 * Payable: true
	 * Constant: false
	 * StateMutability: payable
	 * Type: function
	 * @param to Type: address, Indexed: false
	 * @param tokenId Type: uint256, Indexed: false
	 */
	approve(to: string, tokenId: string): MethodPayableReturnContext;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 * @param owner Type: address, Indexed: false
	 */
	balanceOf(owner: string): MethodConstantReturnContext<string>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param to Type: address, Indexed: false
	 * @param quantity Type: uint256, Indexed: false
	 */
	freeMint(to: string, quantity: string): MethodReturnContext;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 * @param parameter0 Type: address, Indexed: false
	 */
	freeMintList(parameter0: string): MethodConstantReturnContext<string>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 * @param tokenId Type: uint256, Indexed: false
	 */
	getApproved(tokenId: string): MethodConstantReturnContext<string>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 * @param owner Type: address, Indexed: false
	 * @param operator Type: address, Indexed: false
	 */
	isApprovedForAll(
		owner: string,
		operator: string
	): MethodConstantReturnContext<boolean>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 */
	isMintStart(): MethodConstantReturnContext<boolean>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 */
	maxSupply(): MethodConstantReturnContext<string>;
	/**
	 * Payable: true
	 * Constant: false
	 * StateMutability: payable
	 * Type: function
	 * @param to Type: address, Indexed: false
	 * @param quantity Type: uint256, Indexed: false
	 */
	mint(
		to: string,
		quantity: string,
		option: MintOption
	): Promise<MethodPayableReturnContext>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 */
	mintPrice(): Promise<MethodConstantReturnContext<string>>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 */
	mintStartTime(): Promise<MethodConstantReturnContext<string>>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 */
	name(): MethodConstantReturnContext<string>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 */
	owner(): MethodConstantReturnContext<string>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 * @param tokenId Type: uint256, Indexed: false
	 */
	ownerOf(tokenId: string): MethodConstantReturnContext<string>;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 */
	renounceOwnership(): MethodReturnContext;
	/**
	 * Payable: true
	 * Constant: false
	 * StateMutability: payable
	 * Type: function
	 * @param from Type: address, Indexed: false
	 * @param to Type: address, Indexed: false
	 * @param tokenId Type: uint256, Indexed: false
	 */
	safeTransferFrom(
		from: string,
		to: string,
		tokenId: string
	): MethodPayableReturnContext;
	/**
	 * Payable: true
	 * Constant: false
	 * StateMutability: payable
	 * Type: function
	 * @param from Type: address, Indexed: false
	 * @param to Type: address, Indexed: false
	 * @param tokenId Type: uint256, Indexed: false
	 * @param _data Type: bytes, Indexed: false
	 */
	safeTransferFrom(
		from: string,
		to: string,
		tokenId: string,
		_data: string | number[]
	): MethodPayableReturnContext;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param operator Type: address, Indexed: false
	 * @param approved Type: bool, Indexed: false
	 */
	setApprovalForAll(operator: string, approved: boolean): MethodReturnContext;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param baseURI Type: string, Indexed: false
	 */
	setBaseURI(baseURI: string): MethodReturnContext;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param user Type: address, Indexed: false
	 * @param quantity Type: uint256, Indexed: false
	 */
	setFreeMint(user: string, quantity: string): MethodReturnContext;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param mintPrice_ Type: uint256, Indexed: false
	 */
	setMintPrice(mintPrice_: string): MethodReturnContext;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param mintStartTime_ Type: uint256, Indexed: false
	 */
	setMintStartTime(mintStartTime_: string): MethodReturnContext;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 * @param interfaceId Type: bytes4, Indexed: false
	 */
	supportsInterface(
		interfaceId: string | number[]
	): MethodConstantReturnContext<boolean>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 */
	symbol(): MethodConstantReturnContext<string>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 * @param tokenId_ Type: uint256, Indexed: false
	 */
	tokenURI(tokenId_: string): MethodConstantReturnContext<string>;
	/**
	 * Payable: false
	 * Constant: true
	 * StateMutability: view
	 * Type: function
	 */
	totalSupply(): MethodConstantReturnContext<string>;
	/**
	 * Payable: true
	 * Constant: false
	 * StateMutability: payable
	 * Type: function
	 * @param from Type: address, Indexed: false
	 * @param to Type: address, Indexed: false
	 * @param tokenId Type: uint256, Indexed: false
	 */
	transferFrom(
		from: string,
		to: string,
		tokenId: string
	): MethodPayableReturnContext;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 * @param newOwner Type: address, Indexed: false
	 */
	transferOwnership(newOwner: string): MethodReturnContext;
	/**
	 * Payable: false
	 * Constant: false
	 * StateMutability: nonpayable
	 * Type: function
	 */
	withdraw(): MethodReturnContext;
}
