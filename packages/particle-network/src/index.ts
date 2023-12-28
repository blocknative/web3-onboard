import {
	WalletInit,
	EIP1193Provider,
	ProviderRpcError,
	ProviderRpcErrorCode,
	ProviderAccounts,
} from '@web3-onboard/common';
import { createEIP1193Provider } from '@web3-onboard/common';
import { ParticleNetwork, Config } from '@particle-network/auth';
import { ParticleProvider } from '@particle-network/provider';

type AuthTypes =
	| 'email'
	| 'phone'
	| 'google'
	| 'apple'
	| 'twitter'
	| 'facebook'
	| 'microsoft'
	| 'linkedin'
	| 'github'
	| 'twitch'
	| 'discord';

interface PreferredAuthType {
	type: AuthTypes;
	setAsDisplay: boolean;
}

interface ParticleAuthModuleOptions extends Config {
	preferredAuthType?: AuthTypes | PreferredAuthType;
}

const getDisplayLabel = (authType?: string, shouldSetDisplay?: boolean) => {
	if (authType) {
		return shouldSetDisplay
			? authType.charAt(0).toUpperCase() + authType.slice(1)
			: 'Particle Network';
	}
	return 'Particle Network';
};

const particleAuth = (options: ParticleAuthModuleOptions): WalletInit => {
	const { preferredAuthType, ...otherOptions } = options;
	const isAuthTypeObject = typeof preferredAuthType === 'object';
	const authType =
		isAuthTypeObject && preferredAuthType ? preferredAuthType.type : undefined;
	const setAsDisplay =
		isAuthTypeObject && preferredAuthType
			? preferredAuthType.setAsDisplay
			: false;

	const displayLabel = getDisplayLabel(authType, setAsDisplay);

	return () => ({
		label: displayLabel,
		getIcon: async () => {
			const iconName = authType && setAsDisplay ? authType : 'icon';
			return (await import(`./${iconName}.svg`)).default;
		},
		getInterface: async ({ chains }) => {
			let [currentChain] = chains;
			const { label, id } = currentChain;

			const chainName = label
				? label.split(' ')[0].toLowerCase()
				: 'defaultChainName';
			const chainId = parseInt(id.toString(), 16);

			const particleConfig: Config = {
				...otherOptions,
				chainName,
				chainId,
			};

			let particle = new ParticleNetwork(particleConfig);
			let provider = new ParticleProvider(particle.auth);

			function patchProvider(): EIP1193Provider {
				const patchedProvider = createEIP1193Provider(provider, {
					eth_selectAccounts: null,
					eth_requestAccounts: async ({ baseRequest }) => {
						try {
							const accounts = await baseRequest({ method: 'eth_accounts' });
							return accounts as ProviderAccounts;
						} catch (error) {
							console.error(error);
							throw new ProviderRpcError({
								code: ProviderRpcErrorCode.ACCOUNT_ACCESS_REJECTED,
								message: 'Account access rejected',
							});
						}
					},
				});

				patchedProvider.disconnect = () => particle.auth.logout();
				return patchedProvider;
			}

			provider = patchProvider();

			return {
				provider,
				instance: particle,
			};
		},
	});
};

export default particleAuth;
