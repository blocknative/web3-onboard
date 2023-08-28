import { WalletInit } from '@web3-onboard/common';
import Capsule, { Environment, CapsuleEIP1193Provider } from '@usecapsule/web-sdk';
import { mainnet, sepolia, goerli } from '@wagmi/chains';

function capsule(): WalletInit {
    return () => {
        return {
            label: 'Capsule',
            getIcon: async () => (await import('./icon.js')).default,
            getInterface: async () => {
                const capsule = new Capsule(Environment.DEV, undefined, {
                    offloadMPCComputationURL: 'http://localhost:9009',
                });

                const providerOpts = {
                    capsule: capsule,
                    chainId: '1',
                    appName: 'Blocknative',
                    chains: [mainnet, sepolia, goerli]
                };
                const provider = new CapsuleEIP1193Provider(providerOpts);

                return {
                    instance: capsule,
                    provider: provider
                }
            },
        }
    }
}

export default capsule;