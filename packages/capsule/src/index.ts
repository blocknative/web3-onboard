import { WalletInit } from '@web3-onboard/common';
import Capsule, { Environment, CapsuleEIP1193Provider } from '@usecapsule/web-sdk';
import { sepolia, goerli } from '@wagmi/chains';
import type { CapsuleInitOptions } from './types.js'

function capsule(options: CapsuleInitOptions): WalletInit {
    return () => {
        return {
            label: 'Capsule',
            getIcon: async () => (await import('./icon.js')).default,
            getInterface: async () => {
                const capsule = new Capsule(Environment.DEV, options.apiKey, {
                    offloadMPCComputationURL: 'http://localhost:9009',
                    // offloadMPCComputationURL: 'https://partner-mpc-computation.beta.usecapsule.com',
                });

                const providerOpts = {
                    capsule: capsule,
                    chainId: '5',
                    appName: options.appName,
                    chains: [sepolia, goerli]
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