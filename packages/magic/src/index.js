function magic(options) {
    const { apiKey } = options;
    return () => {
        return {
            label: 'Magic',
            getIcon: async () => (await import('./icon.js')).default,
            getInterface: async ({ EventEmitter, BigNumber, chains }) => {
                const { Magic } = await import('magic-sdk');
                const { default: Web3 } = await import('web3');
                const { default: ethers } = await import('ethers');
                const { createEIP1193Provider, ProviderRpcErrorCode, ProviderRpcError } = await import('@bn-onboard/common');
                const emitter = new EventEmitter();
                let customNodeOptions = {
                    chainId: parseInt(chains[0].id, 10),
                    rpcUrl: chains[0].rpcUrl
                };
                console.log(customNodeOptions);
                const login = async () => {
                    const script = document.createElement('script');
                    script.src = 'https://auth.magic.link/pnp/login';
                    script.setAttribute('data-magic-publishable-api-key', apiKey);
                    script.setAttribute('data-redirect-uri', location.pathname);
                    document.body.appendChild(script);
                    const script2 = document.createElement('script');
                    script2.src = 'https://auth.magic.link/pnp/callback';
                    script2.setAttribute('data-magic-publishable-api-key', apiKey);
                    document.body.appendChild(script2);
                };

                const handleLogin = async() => {
                  await login()
                  console
                }
                await handleLogin()
                let magicInstance = new Magic(apiKey, {
                    network: customNodeOptions
                });
                // const loggedIn = await magicInstance.user.isLoggedIn();
                // if (!loggedIn)
                //     newWindow();
                let magicProvider = new Web3(magicInstance.rpcProvider);
                console.log(magicInstance, magicProvider);
                let provider;
                function patchProvider() {
                    provider = createEIP1193Provider(magicProvider, {
                        eth_requestAccounts: async () => {
                            try {
                                if (!loggedIn)
                                    console.error('you should probably log in');
                                const accounts = await magicProvider.eth.getAccounts();
                                console.log('accounts', accounts);
                                return accounts;
                            }
                            catch (error) {
                                console.error('error in request accounts', error);
                                const { code } = error;
                                if (code === -32603) {
                                    throw new ProviderRpcError({
                                        code: ProviderRpcErrorCode.ACCOUNT_ACCESS_REJECTED,
                                        message: 'Account access rejected'
                                    });
                                }
                                return [];
                            }
                        },
                        eth_selectAccounts: null,
                        eth_getBalance: async () => {
                            const address = (await magicProvider.eth.getAccounts())[0];
                            const balance = magicProvider.utils.fromWei(await magicProvider.eth.getBalance(address));
                            console.log(balance, address);
                            return balance
                                ? BigNumber.from(balance)
                                    .mul('1000000000000000000')
                                    .toString()
                                : '0';
                        },
                        wallet_switchEthereumChain: async ({ params }) => {
                            const chain = chains.find(({ id }) => id === params[0].chainId);
                            if (!chain)
                                throw new Error('Chain must be set before switching');
                            // re-instantiate instance with new network
                            customNodeOptions = {
                                chainId: parseInt(chains[0].id, 10),
                                rpcUrl: chains[0].rpcUrl
                            };
                            magicInstance = new Magic(apiKey, {
                                network: customNodeOptions
                            });
                            // get the provider again
                            magicProvider = new Web3(magicInstance.rpcProvider);
                            emitter.emit('chainChanged', chain.id);
                            // patch the provider
                            patchProvider();
                            return null;
                        }
                    });
                    provider.on = emitter.on.bind(emitter);
                    provider.disconnect = () => magicInstance.user.logout();
                    return provider;
                }
                provider = patchProvider();
                return {
                    provider,
                    magicInstance
                };
            }
        };
    };
}
export default magic;
