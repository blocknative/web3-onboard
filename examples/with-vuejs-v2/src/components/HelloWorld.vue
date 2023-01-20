<template>
  <div>
    <h1>{{ msg }}</h1>

    <div class="container">
      <div class="wallet" v-if="connectedWallet">
        <div class="avatar" />
        <div class="details">
          <div v-if="ens">{{ ens.name }}</div>
          <div v-if="uns">{{ uns.name }}</div>
          <div v-if="address">{{ address }}</div>

          <span>Connected Wallet: {{ connectedWallet.label }}</span>
        </div>
        <button type="button" @click="disconnect">Disconnect</button>
      </div>
      <div v-else>
        <button type="button" @click="connect">Connect Wallet</button>
      </div>
    </div>
  </div>
</template>

<script>
import { init, useOnboard } from '@web3-onboard/vue';
import injectedModule from '@web3-onboard/injected-wallets';

const injected = injectedModule();
// With vite
const infuraKey = import.meta.env.VITE_INFURA_KEY;

// Without vite
//const infuraKey = process.env.INFURA_KEY;

const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`;

const web3Onboard = init({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl,
    },
  ],
});

const { wallets, connectWallet, disconnectConnectedWallet, connectedWallet } =
  useOnboard();

const trunc = (address) =>
  !!address ? address.slice(0, 6) + '...' + address.slice(-6) : null;

export default {
  props: {
    msg: String,
  },
  data() {
    return {
      connectedWallet,
      count: 0,
    };
  },
  methods: {
    connect: () => connectWallet(),
    disconnect: () => disconnectConnectedWallet(),
  },
  computed: {
    address: function () {
      if (
        this.connectedWallet.accounts &&
        this.connectedWallet.accounts[0].address
      ) {
        console.log(this.connectedWallet.accounts[0].address);
        return trunc(this.connectedWallet.accounts[0].address);
      }
    },
    ens: function () {
      if (
        this.connectedWallet.accounts &&
        this.connectedWallet.accounts[0].ens?.name
      ) {
        return trunc(this.connectedWallet.accounts[0].ens);
      }
    },
    uns: function () {
      if (
        this.connectedWallet.accounts &&
        this.connectedWallet.accounts[0].uns?.name
      ) {
        return trunc(this.connectedWallet.accounts[0].uns);
      }
    },
  },
};
</script>

<style scoped>
a {
  color: var(--vt-c-brand);
  text-decoration: none;
}

button {
  border: none;
  border-radius: 4px;
  padding: 0 12px;
  letter-spacing: 0.8px;
  line-height: 36px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.87);
  background-color: var(--vt-c-brand);
  transition: background-color 0.25s;
  cursor: pointer;
}

button:hover {
  background-color: var(--vt-c-brand-dark);
}

.container {
  max-width: 64vw;
  margin: auto;
}

.wallet {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-size: 16px;
  width: 100%;
  transition: border-color 0.25s, background-color 0.25s;
  margin: 28px 0;
  border-radius: 8px;
  overflow-x: auto;
  transition: color 0.5s, background-color 0.5s;
  position: relative;
  font-size: 14px;
  line-height: 1.6;
  font-weight: 500;
  background-color: var(--vt-c-bg-soft);
}

.avatar {
  height: 36px;
  width: 36px;
  border-radius: 100%;
  background-image: linear-gradient(
    to right,
    rgb(6, 182, 212),
    rgb(59, 130, 246)
  );
}

.details {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  margin-right: auto;
  margin-left: 12px;
  text-align: left;
}
</style>
