<script>
	import { onMount } from 'svelte';
	import { ethers } from 'ethers';

	let transactionPreview;
	let blocknativeSdk;

	const buildTransaction = async () => {
		const addressFrom = '0xab5801a7d398351b8be11c439e05c5b3259aec9b';

		const CONTRACT_ADDRESS = '0x7a250d5630b4cf539739df2c5dacb4c659f2488d';
		const erc20_interface = [
			'function approve(address _spender, uint256 _value) public returns (bool success)',
			'function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)',
			'function balanceOf(address owner) view returns (uint256)'
		];

		const uniswapV2router_interface = [
			'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
		];

		const weth = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
		const uni = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984';
		let swapTxData;
		let approveTxData;
		const createTransaction = async () => {
			const swapContract = new ethers.Contract(CONTRACT_ADDRESS, uniswapV2router_interface);
			const erc20_contract = new ethers.Contract(weth, erc20_interface);
			const oneHundredUni = ethers.BigNumber.from('100000000000000000000');
			approveTxData = await erc20_contract.populateTransaction.approve(
				CONTRACT_ADDRESS,
				oneHundredUni
			);

			const amountOutMin = 0;
			const amountOutMinHex = ethers.BigNumber.from(amountOutMin.toString())._hex;

			const path = [uni, weth];
			const deadline = Math.floor(Date.now() / 1000) + 60 * 1; // 1 minutes from the current Unix time

			const inputAmountHex = oneHundredUni.toHexString();

			swapTxData = await swapContract.populateTransaction.swapExactTokensForETH(
				inputAmountHex,
				amountOutMinHex,
				path,
				addressFrom,
				deadline
			);
		};
		await createTransaction();
		const account_address = '0xab5801a7d398351b8be11c439e05c5b3259aec9b';
		const uniswapV2Router = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

		return [
			{
				from: account_address,
				to: uni,
				input: approveTxData.data,
				gas: 1000000,
				gasPrice: 48000000000,
				value: 0
			},
			{
				from: account_address,
				to: uniswapV2Router,
				input: swapTxData.data,
				gas: 1000000,
				gasPrice: 48000000000,
				value: 0
			}
		];
	};

	const handlePreview = async () => {
		await transactionPreview.init({
			apiKey: '133a026b-c7a0-419c-a00b-66255b3cd487',
			sdk: blocknativeSdk,
			containerElement: '#tp-container'
		});

		const stubTrans = await buildTransaction();
		await transactionPreview.previewTransaction(stubTrans);
	};

	onMount(async () => {
		const { default: Blocknative } = await import('bnc-sdk');
		const { default: transactionPreviewModule } = await import('@web3-onboard/transaction-preview');

		blocknativeSdk = new Blocknative({
			dappId: '133a026b-c7a0-419c-a00b-66255b3cd487',
			networkId: 1
		});

		transactionPreview = transactionPreviewModule({
			requireTransactionApproval: true
		});
	});
</script>

<div>
	{#await blocknativeSdk && transactionPreview then Preview}
		{#if Preview}
			<button
				class="rounded-lg bg-gray-inverse hover:bg-gray-hover hover:text-gray-inverse transition-all px-4 h-10 text-base text-gray-current"
				on:click={() => handlePreview()}
			>
				Preview Transaction
			</button>

			<div id="tp-container" />
		{/if}
	{/await}
</div>

<style>
	#tp-container {
		height: auto;
		width: 316px;
		margin-top: 12px;
	}
</style>
