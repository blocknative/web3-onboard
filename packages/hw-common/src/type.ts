export interface CustomNetwork {
    networkId: number;
    genesis: GenesisBlock;
    hardforks: Hardfork[];
    bootstrapNodes: BootstrapNode[];
}
export interface GenesisBlock {
    hash: string;
    timestamp: string | null;
    gasLimit: number;
    difficulty: number;
    nonce: string;
    extraData: string;
    stateRoot: string;
}
export interface Hardfork {
    name: string;
    block: number | null;
}
export interface BootstrapNode {
    ip: string;
    port: number | string;
    network?: string;
    chainId?: number;
    id: string;
    location: string;
    comment: string;
}
