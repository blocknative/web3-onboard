import type { WalletInit } from '@web3-onboard/common';
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
			return (await import(`./${iconName}.js`)).default;
		},
		getInterface: async ({ EventEmitter, chains }) => {
			const [currentChain] = chains;
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

			const particle = new ParticleNetwork(particleConfig);

			const loginOptions = authType
				? { preferredAuthType: authType }
				: undefined;
			await particle.auth.login(loginOptions);

			return {
				provider: new ParticleProvider(particle.auth),
				instance: particle,
			};
		},
	});
};

export default particleAuth;