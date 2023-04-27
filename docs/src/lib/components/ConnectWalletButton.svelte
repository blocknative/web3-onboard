<script lang="ts">
	import { onMount } from 'svelte';
	import type { OnboardAPI, WalletState } from '@web3-onboard/core';
	import getOnboard from '$lib/services/onboard.js';
	import { Button } from '@svelteness/kit-docs';
	let onboard: OnboardAPI;
	let connectedWallets: WalletState[];
	let buttonText = 'Connect';

	async function connectWallet() {
		if (!onboard) await initOnboard();
		if (onboard && onboard.state.get().wallets.length) {
			onboard.disconnectWallet({ label: onboard.state.get().wallets[0].label });
			buttonText = 'Connect';
			return;
		}
		if (onboard) {
			await onboard.connectWallet();
		}
	}

	const initOnboard = async () => {
		if (document.location.href.includes('theming-tool')) {
			onboard = await getOnboard('default');
		} else {
			onboard = await getOnboard();
		}
	};

	onMount(async () => {
		if (!onboard) {
			await initOnboard();
		}
		onboard.state.select('wallets').subscribe((wallets) => {
			connectedWallets = wallets;
			buttonText = wallets.length ? 'Disconnect' : (buttonText = 'Connect');
		});
		buttonText = onboard.state.get().wallets.length ? 'Disconnect' : (buttonText = 'Connect');
	});
</script>

<button on:click={() => connectWallet()}>
	<Button primary type="raised" on:click={() => connectWallet()}>{buttonText}</Button>
</button>
