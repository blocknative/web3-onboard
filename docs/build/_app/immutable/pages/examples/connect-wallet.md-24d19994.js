import{S as ss,i as ns,s as as,e as P,w as d,c as U,a as O,x as m,d as p,b as S,g as c,y as u,E as ps,q as f,o as b,B as w,v as es,t as E,k,h as $,m as _,M as I,j as ts,$ as cs}from"../../chunks/index-4af071d0.js";import{C as rs,g as Ds}from"../../chunks/ConnectWalletButton-dbfd40e8.js";import{f as ys}from"../../chunks/scroll-9ce8c56b.js";import{C as Q}from"../../chunks/CodeFence-7c02fe57.js";import{C as os}from"../../chunks/CodeInline-7947d9bd.js";import{L as X}from"../../chunks/Link-5aa5b43b.js";/* empty css                                                         */import"../../chunks/ThemeCustomizer.svelte_svelte_type_style_lang-d7bad545.js";import"@web3-onboard/gas";import"@web3-onboard/core";import"@web3-onboard/injected-wallets";import{T as Fs,a as ls}from"../../chunks/Tabs-6a4561b3.js";import"../../chunks/preload-helper-60cab3ee.js";import"../../chunks/singletons-13ae2ec1.js";import"../../chunks/contexts-e4ffdb2f.js";function Cs(D){let n,a,l;return a=new rs({}),{c(){n=P("div"),d(a.$$.fragment),this.h()},l(r){n=U(r,"DIV",{class:!0});var e=O(n);m(a.$$.fragment,e),e.forEach(p),this.h()},h(){S(n,"class","flex items-center justify-center border-gray-divider border rounded-md h-40 p-4")},m(r,e){c(r,n,e),u(a,n,null),l=!0},p:ps,i(r){l||(f(a.$$.fragment,r),l=!0)},o(r){b(a.$$.fragment,r),l=!1},d(r){r&&p(n),w(a)}}}function As(D){let n;return es(async()=>{n||(n=await Ds())}),[]}class is extends ss{constructor(n){super(),ns(this,n,As,Cs,as,{})}}function ds(D){let n;return{c(){n=E("#")},l(a){n=$(a,"#")},m(a,l){c(a,n,l)},d(a){a&&p(n)}}}function ms(D){let n;return{c(){n=E("#")},l(a){n=$(a,"#")},m(a,l){c(a,n,l)},d(a){a&&p(n)}}}function us(D){let n;return{c(){n=E("#")},l(a){n=$(a,"#")},m(a,l){c(a,n,l)},d(a){a&&p(n)}}}function fs(D){let n,a,l,r,e,i,h,C,y,A,t,F,g,Y,x,G,N,W,v,M,L,H,q,V,T,B,R;return a=new X({props:{class:"header-anchor",href:"#step-1-import-configure","aria-hidden":"true",$$slots:{default:[ds]},$$scope:{ctx:D}}}),C=new Q({props:{title:"App.tsx",lang:"javascript",ext:"js",linesCount:139,rawCode:`import { Web3OnboardProvider, init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import fortmaticModule from '@web3-onboard/fortmatic'
import gnosisModule from '@web3-onboard/gnosis'
import injectedModule from '@web3-onboard/injected-wallets'
import keepkeyModule from '@web3-onboard/keepkey'
import keystoneModule from '@web3-onboard/keystone'
import ledgerModule from '@web3-onboard/ledger'
import portisModule from '@web3-onboard/portis'
import torusModule from '@web3-onboard/torus'
import trezorModule from '@web3-onboard/trezor'
import walletConnectModule from '@web3-onboard/walletconnect'
import coinbaseModule from '@web3-onboard/coinbase'
import magicModule from '@web3-onboard/magic'
import web3authModule from '@web3-onboard/web3auth'
import dcentModule from '@web3-onboard/dcent'
import sequenceModule from '@web3-onboard/sequence'
import tallyHoModule from '@web3-onboard/tallyho'

const INFURA_KEY = ''

const injected = injectedModule()
const coinbase = coinbaseModule()
const dcent = dcentModule()
const walletConnect = walletConnectModule()

const portis = portisModule({
  apiKey: 'apiKey'
})

const fortmatic = fortmaticModule({
  apiKey: 'apiKey'
})

const ledger = ledgerModule()
const keystone = keystoneModule()
const keepkey = keepkeyModule()
const gnosis = gnosisModule()
const sequence = sequenceModule()
const tally = tallyModule()

const trezorOptions = {
  email: 'test@test.com',
  appUrl: 'https://www.blocknative.com'
}

const trezor = trezorModule(trezorOptions)

const magic = magicModule({
  apiKey: 'apiKey'
})

const enkrypt = enkryptModule()
const mewWallet = mewWalletModule()

const wallets = [
  keepkey,
  sequence,
  injected,
  tally,
  ledger,
  coinbase,
  dcent,
  trezor,
  walletConnect,
  enkrypt,
  mewWallet,
  gnosis,
  magic,
  fortmatic,
  keystone,
  portis
]

const chains = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: \`https://mainnet.infura.io/v3/\${INFURA_ID}\`
  },
  {
    id: '0x5',
    token: 'ETH',
    label: 'Goerli',
    rpcUrl: \`https://goerli.infura.io/v3/\${INFURA_ID}\`
  },
  {
    id: '0x13881',
    token: 'MATIC',
    label: 'Polygon - Mumbai',
    rpcUrl: 'https://matic-mumbai.chainstacklabs.com'
  },
  {
    id: '0x38',
    token: 'BNB',
    label: 'Binance',
    rpcUrl: 'https://bsc-dataseed.binance.org/'
  },
  {
    id: '0xA',
    token: 'OETH',
    label: 'Optimism',
    rpcUrl: 'https://mainnet.optimism.io'
  },
  {
    id: '0xA4B1',
    token: 'ARB-ETH',
    label: 'Arbitrum',
    rpcUrl: 'https://rpc.ankr.com/arbitrum'
  }
]

const appMetadata = {
  name: 'Connect Wallet Example',
  icon: '<svg>My App Icon</svg>',
  description: 'Example showcasing how to connect a wallet.',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' },
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
  ]
}

const web3Onboard = init({
  wallets,
  chains
  appMetadata
})

function App() {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <ConnectWallet />
    </Web3OnboardProvider>
  )
}

export default MyApp
`,showCopyCode:!0,code:`<pre><code><span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">Web3OnboardProvider</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">init</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/react</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> injectedModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/injected-wallets</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> fortmaticModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/fortmatic</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> gnosisModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/gnosis</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> injectedModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/injected-wallets</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> keepkeyModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/keepkey</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> keystoneModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/keystone</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> ledgerModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/ledger</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> portisModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/portis</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> torusModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/torus</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> trezorModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/trezor</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> walletConnectModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/walletconnect</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> coinbaseModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/coinbase</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> magicModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/magic</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> web3authModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/web3auth</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> dcentModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/dcent</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> sequenceModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/sequence</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> tallyHoModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/tallyho</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> INFURA_KEY </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> injected </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">injectedModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> coinbase </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">coinbaseModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> dcent </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">dcentModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> walletConnect </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">walletConnectModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> portis </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">portisModule</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">apiKey</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">apiKey</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> fortmatic </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">fortmaticModule</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">apiKey</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">apiKey</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> ledger </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">ledgerModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> keystone </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">keystoneModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> keepkey </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">keepkeyModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> gnosis </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">gnosisModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> sequence </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">sequenceModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> tally </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">tallyModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> trezorOptions </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">email</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">test@test.com</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">appUrl</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">https://www.blocknative.com</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> trezor </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">trezorModule</span><span style="color: #A6ACCD">(trezorOptions)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> magic </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">magicModule</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">apiKey</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">apiKey</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> enkrypt </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">enkryptModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> mewWallet </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">mewWalletModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> wallets </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> [</span></span>
<span class="line"><span style="color: #A6ACCD">  keepkey</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  sequence</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  injected</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  tally</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  ledger</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  coinbase</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  dcent</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  trezor</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  walletConnect</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  enkrypt</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  mewWallet</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  gnosis</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  magic</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  fortmatic</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  keystone</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  portis</span></span>
<span class="line"><span style="color: #A6ACCD">]</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> chains </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> [</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">id</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0x1</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">token</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">ETH</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">label</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Ethereum Mainnet</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">rpcUrl</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">\`</span><span style="color: #C3E88D">https://mainnet.infura.io/v3/</span><span style="color: #89DDFF">\${</span><span style="color: #A6ACCD">INFURA_ID</span><span style="color: #89DDFF">}\`</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">id</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0x5</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">token</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">ETH</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">label</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Goerli</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">rpcUrl</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">\`</span><span style="color: #C3E88D">https://goerli.infura.io/v3/</span><span style="color: #89DDFF">\${</span><span style="color: #A6ACCD">INFURA_ID</span><span style="color: #89DDFF">}\`</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">id</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0x13881</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">token</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">MATIC</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">label</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Polygon - Mumbai</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">rpcUrl</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">https://matic-mumbai.chainstacklabs.com</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">id</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0x38</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">token</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">BNB</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">label</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Binance</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">rpcUrl</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">https://bsc-dataseed.binance.org/</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">id</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0xA</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">token</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">OETH</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">label</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Optimism</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">rpcUrl</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">https://mainnet.optimism.io</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">id</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0xA4B1</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">token</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">ARB-ETH</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">label</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Arbitrum</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">rpcUrl</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">https://rpc.ankr.com/arbitrum</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #A6ACCD">]</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> appMetadata </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Connect Wallet Example</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">icon</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">&lt;svg&gt;My App Icon&lt;/svg&gt;</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">description</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Example showcasing how to connect a wallet.</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">recommendedInjectedWallets</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">MetaMask</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">url</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">https://metamask.io</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">},</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Coinbase</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">url</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">https://wallet.coinbase.com/</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #A6ACCD">  ]</span></span>
<span class="line"><span style="color: #89DDFF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> web3Onboard </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">init</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  wallets</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  chains</span></span>
<span class="line"><span style="color: #A6ACCD">  appMetadata</span></span>
<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">function</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">App</span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF; font-style: italic">return</span><span style="color: #F07178"> (</span></span>
<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF">&lt;</span><span style="color: #FFCB6B">Web3OnboardProvider</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">web3Onboard</span><span style="color: #89DDFF">={</span><span style="color: #A6ACCD">web3Onboard</span><span style="color: #89DDFF">}&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #89DDFF">&lt;</span><span style="color: #FFCB6B">ConnectWallet</span><span style="color: #89DDFF"> /&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;/</span><span style="color: #FFCB6B">Web3OnboardProvider</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #F07178">  )</span></span>
<span class="line"><span style="color: #89DDFF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">export</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">default</span><span style="color: #A6ACCD"> MyApp</span></span>
<span class="line"></span></code></pre>`}}),A=new X({props:{class:"header-anchor",href:"#step-2-display-the-connect-wallet-button","aria-hidden":"true",$$slots:{default:[ms]},$$scope:{ctx:D}}}),x=new os({props:{code:"useConnectWallet"}}),W=new Q({props:{title:"ConnectWallet.tsx",lang:"javascript",ext:"js",linesCount:26,rawCode:`import { useEffect } from 'react'
import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'

export default function ConnectWallet() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [ethersProvider, setProvider] = useState<ethers.providers.Web3Provider | null>()

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
    }
  }, [wallet])

  return (
    <div>
      <button
        disabled={connecting}
        onClick={connect}>
        Connect
      </button>
    </div>
  )
}
`,showCopyCode:!0,code:`<pre><code><span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useEffect</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">react</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useConnectWallet</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/react</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">ethers</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">ethers</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">export</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">default</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">function</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">ConnectWallet</span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">[{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">connecting</span><span style="color: #F07178"> </span><span style="color: #89DDFF">},</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">connect</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">disconnect</span><span style="color: #89DDFF">]</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #82AAFF">useConnectWallet</span><span style="color: #F07178">()</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">[</span><span style="color: #A6ACCD">ethersProvider</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">setProvider</span><span style="color: #89DDFF">]</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #82AAFF">useState</span><span style="color: #89DDFF">&lt;</span><span style="color: #FFCB6B">ethers</span><span style="color: #89DDFF">.</span><span style="color: #FFCB6B">providers</span><span style="color: #89DDFF">.</span><span style="color: #FFCB6B">Web3Provider</span><span style="color: #F07178"> </span><span style="color: #89DDFF">|</span><span style="color: #F07178"> </span><span style="color: #FFCB6B">null</span><span style="color: #89DDFF">&gt;</span><span style="color: #F07178">()</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #82AAFF">useEffect</span><span style="color: #F07178">(</span><span style="color: #89DDFF">()</span><span style="color: #F07178"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #89DDFF">    </span><span style="color: #464B5D; font-style: italic">// If the wallet has a provider than the wallet is connected</span></span>
<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF; font-style: italic">if</span><span style="color: #F07178"> (</span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">provider</span><span style="color: #F07178">) </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">      </span><span style="color: #82AAFF">setProvider</span><span style="color: #F07178">(</span><span style="color: #89DDFF">new</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">ethers</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">providers</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">Web3Provider</span><span style="color: #F07178">(</span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">provider</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">any</span><span style="color: #89DDFF">&#39;</span><span style="color: #F07178">))</span></span>
<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">},</span><span style="color: #F07178"> [</span><span style="color: #A6ACCD">wallet</span><span style="color: #F07178">])</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF; font-style: italic">return</span><span style="color: #F07178"> (</span></span>
<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">button</span></span>
<span class="line"><span style="color: #89DDFF">        </span><span style="color: #C792EA">disabled</span><span style="color: #89DDFF">={</span><span style="color: #A6ACCD">connecting</span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #89DDFF">        </span><span style="color: #C792EA">onClick</span><span style="color: #89DDFF">={</span><span style="color: #A6ACCD">connect</span><span style="color: #89DDFF">}&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">        Connect</span></span>
<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">button</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #F07178">  )</span></span>
<span class="line"><span style="color: #89DDFF">}</span></span>
<span class="line"></span></code></pre>`}}),M=new X({props:{class:"header-anchor",href:"#step-3-display-account-information","aria-hidden":"true",$$slots:{default:[us]},$$scope:{ctx:D}}}),B=new Q({props:{title:"ConnectWallet.tsx",lang:"javascript",ext:"js",linesCount:49,highlightLines:[[8,8],[10,19],[28,37]],rawCode:`import { useEffect } from 'react'
import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'

export default function ConnectWallet() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [ethersProvider, setProvider] = useState<ethers.providers.Web3Provider | null>()
  const [account, setAccount] = useState<Account | null>(null)

  useEffect(() => {
    if (wallet?.provider) {
      const { name, avatar } = wallet?.accounts[0].ens ?? {}
      setAccount({
        address: wallet.accounts[0].address,
        balance: wallet.accounts[0].balance,
        ens: { name, avatar: avatar?.url }
      })
    }
  }, [wallet])

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
    }
  }, [wallet])

  if(wallet?.provider) {
    return (
        <div>
          <img src={ens?.avatar} alt="ENS Avatar" />
          <div>{ ens?.name ? ens.name : address }</div>
          <div>Connected to {wallet.label}</div>
          <button onClick={() => { disconnect({ label: wallet.label }) }>Disconnect</button>
        </div>
    )
  }

  return (
    <div>
      <button
        disabled={connecting}
        onClick={connect}>
        Connect
      </button>
    </div>
  )
}
`,showCopyCode:!0,code:`<pre><code><span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useEffect</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">react</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useConnectWallet</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/react</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">ethers</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">ethers</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">export</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">default</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">function</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">ConnectWallet</span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">[{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">connecting</span><span style="color: #F07178"> </span><span style="color: #89DDFF">},</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">connect</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">disconnect</span><span style="color: #89DDFF">]</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #82AAFF">useConnectWallet</span><span style="color: #F07178">()</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">[</span><span style="color: #A6ACCD">ethersProvider</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">setProvider</span><span style="color: #89DDFF">]</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #82AAFF">useState</span><span style="color: #89DDFF">&lt;</span><span style="color: #FFCB6B">ethers</span><span style="color: #89DDFF">.</span><span style="color: #FFCB6B">providers</span><span style="color: #89DDFF">.</span><span style="color: #FFCB6B">Web3Provider</span><span style="color: #F07178"> </span><span style="color: #89DDFF">|</span><span style="color: #F07178"> </span><span style="color: #FFCB6B">null</span><span style="color: #89DDFF">&gt;</span><span style="color: #F07178">()</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">[</span><span style="color: #A6ACCD">account</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">setAccount</span><span style="color: #89DDFF">]</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #82AAFF">useState</span><span style="color: #89DDFF">&lt;</span><span style="color: #FFCB6B">Account</span><span style="color: #F07178"> </span><span style="color: #89DDFF">|</span><span style="color: #F07178"> </span><span style="color: #FFCB6B">null</span><span style="color: #89DDFF">&gt;</span><span style="color: #F07178">(</span><span style="color: #89DDFF">null</span><span style="color: #F07178">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #82AAFF">useEffect</span><span style="color: #F07178">(</span><span style="color: #89DDFF">()</span><span style="color: #F07178"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF; font-style: italic">if</span><span style="color: #F07178"> (</span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">provider</span><span style="color: #F07178">) </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">      </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">name</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">avatar</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">accounts</span><span style="color: #F07178">[</span><span style="color: #F78C6C">0</span><span style="color: #F07178">]</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">ens</span><span style="color: #F07178"> </span><span style="color: #89DDFF">??</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{}</span></span>
<span class="line"><span style="color: #F07178">      </span><span style="color: #82AAFF">setAccount</span><span style="color: #F07178">(</span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">        address</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">accounts</span><span style="color: #F07178">[</span><span style="color: #F78C6C">0</span><span style="color: #F07178">]</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">address</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #F07178">        balance</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">accounts</span><span style="color: #F07178">[</span><span style="color: #F78C6C">0</span><span style="color: #F07178">]</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">balance</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #F07178">        ens</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">name</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> avatar</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">avatar</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">url</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #F07178">      </span><span style="color: #89DDFF">}</span><span style="color: #F07178">)</span></span>
<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">},</span><span style="color: #F07178"> [</span><span style="color: #A6ACCD">wallet</span><span style="color: #F07178">])</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #82AAFF">useEffect</span><span style="color: #F07178">(</span><span style="color: #89DDFF">()</span><span style="color: #F07178"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #89DDFF">    </span><span style="color: #464B5D; font-style: italic">// If the wallet has a provider than the wallet is connected</span></span>
<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF; font-style: italic">if</span><span style="color: #F07178"> (</span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">provider</span><span style="color: #F07178">) </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">      </span><span style="color: #82AAFF">setProvider</span><span style="color: #F07178">(</span><span style="color: #89DDFF">new</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">ethers</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">providers</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">Web3Provider</span><span style="color: #F07178">(</span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">provider</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">any</span><span style="color: #89DDFF">&#39;</span><span style="color: #F07178">))</span></span>
<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">},</span><span style="color: #F07178"> [</span><span style="color: #A6ACCD">wallet</span><span style="color: #F07178">])</span></span>
<span class="line"></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF; font-style: italic">if</span><span style="color: #F07178">(</span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">provider</span><span style="color: #F07178">) </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF; font-style: italic">return</span><span style="color: #F07178"> (</span></span>
<span class="line"><span style="color: #F07178">        </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">          </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">img</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">src</span><span style="color: #89DDFF">={</span><span style="color: #A6ACCD">ens</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">avatar</span><span style="color: #89DDFF">} </span><span style="color: #C792EA">alt</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">ENS Avatar</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> /&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">          </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;{</span><span style="color: #A6ACCD"> ens</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">name </span><span style="color: #89DDFF">?</span><span style="color: #A6ACCD"> ens</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">name </span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> address </span><span style="color: #89DDFF">}&lt;/</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">          </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span><span style="color: #A6ACCD">Connected to </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">label</span><span style="color: #89DDFF">}&lt;/</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">          </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">button</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">onClick</span><span style="color: #89DDFF">={()</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #82AAFF">disconnect</span><span style="color: #F07178">(</span><span style="color: #89DDFF">{</span><span style="color: #F07178"> label</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">label</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #F07178">) </span><span style="color: #89DDFF">}&gt;</span><span style="color: #A6ACCD">Disconnect</span><span style="color: #89DDFF">&lt;/</span><span style="color: #A6ACCD">button</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #89DDFF">&lt;/</span><span style="color: #A6ACCD">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">    )</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #89DDFF">  </span><span style="color: #C792EA">return</span><span style="color: #89DDFF"> (</span></span>
<span class="line"><span style="color: #89DDFF">    &lt;div&gt;</span></span>
<span class="line"><span style="color: #89DDFF">      &lt;button</span></span>
<span class="line"><span style="color: #89DDFF">        </span><span style="color: #C792EA">disabled</span><span style="color: #89DDFF">={</span><span style="color: #A6ACCD">connecting</span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #89DDFF">        </span><span style="color: #C792EA">onClick</span><span style="color: #89DDFF">={</span><span style="color: #A6ACCD">connect</span><span style="color: #89DDFF">}&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">        Connect</span></span>
<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">button</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #F07178">  )</span></span>
<span class="line"><span style="color: #89DDFF">}</span></span>
<span class="line"></span></code></pre>`}}),{c(){n=P("h2"),d(a.$$.fragment),l=E(" Step 1: Import + Configure"),r=k(),e=P("p"),i=E("Import the libraries and any wallets you would like to use. For this example, we are going to use the injected wallets module. You can easily add more wallet support to your dapp via our other wallet modules. Additionally, we'll setup web3-onboard to support 2 chains: Ethereum mainnet and Polygon mainnet."),h=k(),d(C.$$.fragment),y=P("h2"),d(A.$$.fragment),t=E(" Step 2: Display the connect wallet button"),F=k(),g=P("p"),Y=E("In another file we'll create the component that will display our connect wallet button. We'll be using the "),d(x.$$.fragment),G=E(" hook in order to achieve this."),N=k(),d(W.$$.fragment),v=P("h2"),d(M.$$.fragment),L=E(" Step 3: Display account information"),H=k(),q=P("p"),V=E("Now that we have our wallet connected, let's display some basic information, such as the connected wallet's address, ENS name, and avatar."),T=k(),d(B.$$.fragment),this.h()},l(s){n=U(s,"H2",{id:!0,tabindex:!0});var o=O(n);m(a.$$.fragment,o),l=$(o," Step 1: Import + Configure"),o.forEach(p),r=_(s),e=U(s,"P",{});var K=O(e);i=$(K,"Import the libraries and any wallets you would like to use. For this example, we are going to use the injected wallets module. You can easily add more wallet support to your dapp via our other wallet modules. Additionally, we'll setup web3-onboard to support 2 chains: Ethereum mainnet and Polygon mainnet."),K.forEach(p),h=_(s),m(C.$$.fragment,s),y=U(s,"H2",{id:!0,tabindex:!0});var z=O(y);m(A.$$.fragment,z),t=$(z," Step 2: Display the connect wallet button"),z.forEach(p),F=_(s),g=U(s,"P",{});var j=O(g);Y=$(j,"In another file we'll create the component that will display our connect wallet button. We'll be using the "),m(x.$$.fragment,j),G=$(j," hook in order to achieve this."),j.forEach(p),N=_(s),m(W.$$.fragment,s),v=U(s,"H2",{id:!0,tabindex:!0});var J=O(v);m(M.$$.fragment,J),L=$(J," Step 3: Display account information"),J.forEach(p),H=_(s),q=U(s,"P",{});var Z=O(q);V=$(Z,"Now that we have our wallet connected, let's display some basic information, such as the connected wallet's address, ENS name, and avatar."),Z.forEach(p),T=_(s),m(B.$$.fragment,s),this.h()},h(){S(n,"id","step-1-import-configure"),S(n,"tabindex","-1"),S(y,"id","step-2-display-the-connect-wallet-button"),S(y,"tabindex","-1"),S(v,"id","step-3-display-account-information"),S(v,"tabindex","-1")},m(s,o){c(s,n,o),u(a,n,null),I(n,l),c(s,r,o),c(s,e,o),I(e,i),c(s,h,o),u(C,s,o),c(s,y,o),u(A,y,null),I(y,t),c(s,F,o),c(s,g,o),I(g,Y),u(x,g,null),I(g,G),c(s,N,o),u(W,s,o),c(s,v,o),u(M,v,null),I(v,L),c(s,H,o),c(s,q,o),I(q,V),c(s,T,o),u(B,s,o),R=!0},p(s,[o]){const K={};o&1&&(K.$$scope={dirty:o,ctx:s}),a.$set(K);const z={};o&1&&(z.$$scope={dirty:o,ctx:s}),A.$set(z);const j={};o&1&&(j.$$scope={dirty:o,ctx:s}),M.$set(j)},i(s){R||(f(a.$$.fragment,s),f(C.$$.fragment,s),f(A.$$.fragment,s),f(x.$$.fragment,s),f(W.$$.fragment,s),f(M.$$.fragment,s),f(B.$$.fragment,s),R=!0)},o(s){b(a.$$.fragment,s),b(C.$$.fragment,s),b(A.$$.fragment,s),b(x.$$.fragment,s),b(W.$$.fragment,s),b(M.$$.fragment,s),b(B.$$.fragment,s),R=!1},d(s){s&&p(n),w(a),s&&p(r),s&&p(e),s&&p(h),w(C,s),s&&p(y),w(A),s&&p(F),s&&p(g),w(x),s&&p(N),w(W,s),s&&p(v),w(M),s&&p(H),s&&p(q),s&&p(T),w(B,s)}}}class bs extends ss{constructor(n){super(),ns(this,n,null,fs,as,{})}}function ws(D){let n;return{c(){n=E("#")},l(a){n=$(a,"#")},m(a,l){c(a,n,l)},d(a){a&&p(n)}}}function Es(D){let n;return{c(){n=E("#")},l(a){n=$(a,"#")},m(a,l){c(a,n,l)},d(a){a&&p(n)}}}function $s(D){let n;return{c(){n=E("#")},l(a){n=$(a,"#")},m(a,l){c(a,n,l)},d(a){a&&p(n)}}}function gs(D){let n,a,l,r,e,i,h,C,y,A,t,F,g,Y,x,G,N,W,v,M,L,H,q,V,T,B,R;return a=new X({props:{class:"header-anchor",href:"#step-1-import-configure","aria-hidden":"true",$$slots:{default:[ws]},$$scope:{ctx:D}}}),C=new Q({props:{title:"onboard.js",lang:"javascript",ext:"js",linesCount:131,rawCode:`import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import fortmaticModule from '@web3-onboard/fortmatic'
import gnosisModule from '@web3-onboard/gnosis'
import injectedModule from '@web3-onboard/injected-wallets'
import keepkeyModule from '@web3-onboard/keepkey'
import keystoneModule from '@web3-onboard/keystone'
import ledgerModule from '@web3-onboard/ledger'
import portisModule from '@web3-onboard/portis'
import torusModule from '@web3-onboard/torus'
import trezorModule from '@web3-onboard/trezor'
import walletConnectModule from '@web3-onboard/walletconnect'
import coinbaseModule from '@web3-onboard/coinbase'
import magicModule from '@web3-onboard/magic'
import web3authModule from '@web3-onboard/web3auth'
import dcentModule from '@web3-onboard/dcent'
import sequenceModule from '@web3-onboard/sequence'
import tallyHoModule from '@web3-onboard/tallyho'

const INFURA_KEY = ''

const injected = injectedModule()
const coinbase = coinbaseModule()
const dcent = dcentModule()
const walletConnect = walletConnectModule()

const portis = portisModule({
  apiKey: 'apiKey'
})

const fortmatic = fortmaticModule({
  apiKey: 'apiKey'
})

const ledger = ledgerModule()
const keystone = keystoneModule()
const keepkey = keepkeyModule()
const gnosis = gnosisModule()
const sequence = sequenceModule()
const tally = tallyModule()

const trezorOptions = {
  email: 'test@test.com',
  appUrl: 'https://www.blocknative.com'
}

const trezor = trezorModule(trezorOptions)

const magic = magicModule({
  apiKey: 'apiKey'
})

const enkrypt = enkryptModule()
const mewWallet = mewWalletModule()

const wallets = [
  keepkey,
  sequence,
  injected,
  tally,
  ledger,
  coinbase,
  dcent,
  trezor,
  walletConnect,
  enkrypt,
  mewWallet,
  gnosis,
  magic,
  fortmatic,
  keystone,
  portis
]

const chains = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: \`https://mainnet.infura.io/v3/\${INFURA_ID}\`
  },
  {
    id: '0x5',
    token: 'ETH',
    label: 'Goerli',
    rpcUrl: \`https://goerli.infura.io/v3/\${INFURA_ID}\`
  },
  {
    id: '0x13881',
    token: 'MATIC',
    label: 'Polygon - Mumbai',
    rpcUrl: 'https://matic-mumbai.chainstacklabs.com'
  },
  {
    id: '0x38',
    token: 'BNB',
    label: 'Binance',
    rpcUrl: 'https://bsc-dataseed.binance.org/'
  },
  {
    id: '0xA',
    token: 'OETH',
    label: 'Optimism',
    rpcUrl: 'https://mainnet.optimism.io'
  },
  {
    id: '0xA4B1',
    token: 'ARB-ETH',
    label: 'Arbitrum',
    rpcUrl: 'https://rpc.ankr.com/arbitrum'
  }
]

const appMetadata = {
  name: 'Connect Wallet Example',
  icon: '<svg>My App Icon</svg>',
  description: 'Example showcasing how to connect a wallet.',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' },
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
  ]
}

const onboard = Onboard({
  wallets,
  chains,
  appMetadata
})

export default onboard
`,showCopyCode:!0,code:`<pre><code><span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> Onboard </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/core</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> injectedModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/injected-wallets</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> fortmaticModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/fortmatic</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> gnosisModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/gnosis</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> injectedModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/injected-wallets</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> keepkeyModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/keepkey</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> keystoneModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/keystone</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> ledgerModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/ledger</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> portisModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/portis</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> torusModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/torus</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> trezorModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/trezor</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> walletConnectModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/walletconnect</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> coinbaseModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/coinbase</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> magicModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/magic</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> web3authModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/web3auth</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> dcentModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/dcent</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> sequenceModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/sequence</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> tallyHoModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/tallyho</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> INFURA_KEY </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> injected </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">injectedModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> coinbase </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">coinbaseModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> dcent </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">dcentModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> walletConnect </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">walletConnectModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> portis </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">portisModule</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">apiKey</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">apiKey</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> fortmatic </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">fortmaticModule</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">apiKey</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">apiKey</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> ledger </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">ledgerModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> keystone </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">keystoneModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> keepkey </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">keepkeyModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> gnosis </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">gnosisModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> sequence </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">sequenceModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> tally </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">tallyModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> trezorOptions </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">email</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">test@test.com</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">appUrl</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">https://www.blocknative.com</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> trezor </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">trezorModule</span><span style="color: #A6ACCD">(trezorOptions)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> magic </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">magicModule</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">apiKey</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">apiKey</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> enkrypt </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">enkryptModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> mewWallet </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">mewWalletModule</span><span style="color: #A6ACCD">()</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> wallets </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> [</span></span>
<span class="line"><span style="color: #A6ACCD">  keepkey</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  sequence</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  injected</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  tally</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  ledger</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  coinbase</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  dcent</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  trezor</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  walletConnect</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  enkrypt</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  mewWallet</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  gnosis</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  magic</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  fortmatic</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  keystone</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  portis</span></span>
<span class="line"><span style="color: #A6ACCD">]</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> chains </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> [</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">id</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0x1</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">token</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">ETH</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">label</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Ethereum Mainnet</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">rpcUrl</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">\`</span><span style="color: #C3E88D">https://mainnet.infura.io/v3/</span><span style="color: #89DDFF">\${</span><span style="color: #A6ACCD">INFURA_ID</span><span style="color: #89DDFF">}\`</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">id</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0x5</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">token</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">ETH</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">label</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Goerli</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">rpcUrl</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">\`</span><span style="color: #C3E88D">https://goerli.infura.io/v3/</span><span style="color: #89DDFF">\${</span><span style="color: #A6ACCD">INFURA_ID</span><span style="color: #89DDFF">}\`</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">id</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0x13881</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">token</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">MATIC</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">label</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Polygon - Mumbai</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">rpcUrl</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">https://matic-mumbai.chainstacklabs.com</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">id</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0x38</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">token</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">BNB</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">label</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Binance</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">rpcUrl</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">https://bsc-dataseed.binance.org/</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">id</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0xA</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">token</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">OETH</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">label</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Optimism</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">rpcUrl</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">https://mainnet.optimism.io</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">id</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0xA4B1</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">token</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">ARB-ETH</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">label</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Arbitrum</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">rpcUrl</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">https://rpc.ankr.com/arbitrum</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #A6ACCD">]</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> appMetadata </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Connect Wallet Example</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">icon</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">&lt;svg&gt;My App Icon&lt;/svg&gt;</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">description</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Example showcasing how to connect a wallet.</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">recommendedInjectedWallets</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">MetaMask</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">url</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">https://metamask.io</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">},</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Coinbase</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">url</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">https://wallet.coinbase.com/</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #A6ACCD">  ]</span></span>
<span class="line"><span style="color: #89DDFF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> onboard </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">Onboard</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">  wallets</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  chains</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">  appMetadata</span></span>
<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #89DDFF; font-style: italic">export</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">default</span><span style="color: #A6ACCD"> onboard</span></span>
<span class="line"></span></code></pre>`}}),A=new X({props:{class:"header-anchor",href:"#step-2-display-the-connect-wallet-button","aria-hidden":"true",$$slots:{default:[Es]},$$scope:{ctx:D}}}),x=new os({props:{code:"App.svelte"}}),W=new Q({props:{title:"App.svelte",lang:"svelte",ext:"svelte",linesCount:8,rawCode:`<script&#8203 lang="js">
  import onboard from './onboard.js'
<\/script>

<div>
  <button disabled={connecting} onClick={connect}> Connect </button>
</div>
`,showCopyCode:!0,code:`<pre><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">lang</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">js</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> onboard </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">./onboard.js</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">button</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">disabled</span><span style="color: #89DDFF">={</span><span style="color: #A6ACCD">connecting</span><span style="color: #89DDFF">} </span><span style="color: #C792EA">onClick</span><span style="color: #89DDFF">={</span><span style="color: #A6ACCD">connect</span><span style="color: #89DDFF">}&gt;</span><span style="color: #A6ACCD"> Connect </span><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">button</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"></span></code></pre>`}}),M=new X({props:{class:"header-anchor",href:"#step-3-display-account-information","aria-hidden":"true",$$slots:{default:[$s]},$$scope:{ctx:D}}}),B=new Q({props:{title:"App.svelte",lang:"svelte",ext:"svelte",linesCount:41,rawCode:`<script&#8203 lang="js">
  import onboard from './onboard.js'

  // Subscribe to wallet updates
  const wallets$ = onboard.state.select('wallets')

  // The first wallet in the array of connected wallets
  $: connectedAccount = $wallets$?.[0]?.accounts?.[0]

  $: account = connectedAccount?.ens?.name
  ? {
      ens: connectedAccount?.ens,
      address: connectedAccount?.address
    }
  : { address: connectedAccount?.address }

  const connect = async () => {
    await onboard.connectWallet()
  }

  const disconnect = ({ label }) => {
    onboard.disconnectWallet({ label })
  }
<\/script>

{#if $wallets$?.[0]?.provider}
  <div>
    <img src={ens?.avatar} alt="ENS Avatar" />
    <div>{ ens?.name ? ens.name : address }</div>
    <div>Connected to {wallet.label}</div>
    <button onClick={() => { disconnect($wallets$?.[0]) }>Disconnect</button>
  </div>
{:else}
  <div>
    <button
      onClick={connect}>
      Connect
    </button>
  </div>
{/if}
`,showCopyCode:!0,code:`<pre><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">lang</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">js</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> onboard </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">./onboard.js</span><span style="color: #89DDFF">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #89DDFF">  </span><span style="color: #464B5D; font-style: italic">// Subscribe to wallet updates</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> wallets$ </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> onboard</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">state</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">select</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">wallets</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #89DDFF">  </span><span style="color: #464B5D; font-style: italic">// The first wallet in the array of connected wallets</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #FFCB6B">$</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> connectedAccount </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">$</span><span style="color: #A6ACCD">wallets$</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">[</span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">accounts</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">[</span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD">]</span></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #FFCB6B">$</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> account </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> connectedAccount</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">ens</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">name</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">?</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">ens</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> connectedAccount</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">ens</span><span style="color: #89DDFF">,</span></span>
<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">address</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> connectedAccount</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">address</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">address</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> connectedAccount</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">address </span><span style="color: #89DDFF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> connect </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">async</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF; font-style: italic">await</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">onboard</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">connectWallet</span><span style="color: #F07178">()</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> disconnect </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">({</span><span style="color: #A6ACCD"> label </span><span style="color: #89DDFF">})</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>
<span class="line"><span style="color: #F07178">    </span><span style="color: #A6ACCD">onboard</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">disconnectWallet</span><span style="color: #F07178">(</span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">label</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #F07178">)</span></span>
<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #89DDFF">{#</span><span style="color: #89DDFF; font-style: italic">if</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">$</span><span style="color: #A6ACCD">wallets$</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">[</span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">provider</span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">img</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">src</span><span style="color: #89DDFF">={</span><span style="color: #A6ACCD">ens</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">avatar</span><span style="color: #89DDFF">} </span><span style="color: #C792EA">alt</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">ENS Avatar</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> /&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;{</span><span style="color: #A6ACCD"> ens</span><span style="color: #89DDFF">?.</span><span style="color: #A6ACCD">name </span><span style="color: #89DDFF">?</span><span style="color: #A6ACCD"> ens</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">name </span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> address </span><span style="color: #89DDFF">}&lt;/</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span><span style="color: #A6ACCD">Connected to </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD">wallet</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">label</span><span style="color: #89DDFF">}&lt;/</span><span style="color: #F07178">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">button</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">onClick</span><span style="color: #89DDFF">={()</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #82AAFF">disconnect</span><span style="color: #F07178">(</span><span style="color: #89DDFF">$</span><span style="color: #A6ACCD">wallets$</span><span style="color: #89DDFF">?.</span><span style="color: #F07178">[</span><span style="color: #F78C6C">0</span><span style="color: #F07178">]) </span><span style="color: #89DDFF">}&gt;</span><span style="color: #A6ACCD">Disconnect</span><span style="color: #89DDFF">&lt;/</span><span style="color: #A6ACCD">button</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;/</span><span style="color: #A6ACCD">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #89DDFF">{</span><span style="color: #F07178">:</span><span style="color: #89DDFF; font-style: italic">else</span><span style="color: #89DDFF">}</span></span>
<span class="line"><span style="color: #A6ACCD">  &lt;</span><span style="color: #FFCB6B">div</span><span style="color: #A6ACCD">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;</span><span style="color: #A6ACCD">button</span></span>
<span class="line"><span style="color: #A6ACCD">      onClick</span><span style="color: #89DDFF">={</span><span style="color: #A6ACCD">connect</span><span style="color: #89DDFF">}&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">      Connect</span></span>
<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;/</span><span style="color: #A6ACCD">button</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;/</span><span style="color: #A6ACCD">div</span><span style="color: #89DDFF">&gt;</span></span>
<span class="line"><span style="color: #89DDFF">{/</span><span style="color: #89DDFF; font-style: italic">if</span><span style="color: #89DDFF">}</span></span>
<span class="line"></span></code></pre>`}}),{c(){n=P("h2"),d(a.$$.fragment),l=E(" Step 1: Import + Configure"),r=k(),e=P("p"),i=E("Import the libraries and any wallets you would like to use. For this example, we are going to use the injected wallets module. You can easily add more wallet support to your dapp via our other wallet modules. Additionally, we'll setup web3-onboard to support 2 chains: Ethereum mainnet and Polygon mainnet."),h=k(),d(C.$$.fragment),y=P("h2"),d(A.$$.fragment),t=E(" Step 2: Display the connect wallet button"),F=k(),g=P("p"),Y=E("In main "),d(x.$$.fragment),G=E(" file we'll import our previously initialized web3-onboard instance and then display our connect wallet button."),N=k(),d(W.$$.fragment),v=P("h2"),d(M.$$.fragment),L=E(" Step 3: Display account information"),H=k(),q=P("p"),V=E("Now that we have our wallet connected, let's display some basic information, such as the connected wallet's address, ENS name, and avatar."),T=k(),d(B.$$.fragment),this.h()},l(s){n=U(s,"H2",{id:!0,tabindex:!0});var o=O(n);m(a.$$.fragment,o),l=$(o," Step 1: Import + Configure"),o.forEach(p),r=_(s),e=U(s,"P",{});var K=O(e);i=$(K,"Import the libraries and any wallets you would like to use. For this example, we are going to use the injected wallets module. You can easily add more wallet support to your dapp via our other wallet modules. Additionally, we'll setup web3-onboard to support 2 chains: Ethereum mainnet and Polygon mainnet."),K.forEach(p),h=_(s),m(C.$$.fragment,s),y=U(s,"H2",{id:!0,tabindex:!0});var z=O(y);m(A.$$.fragment,z),t=$(z," Step 2: Display the connect wallet button"),z.forEach(p),F=_(s),g=U(s,"P",{});var j=O(g);Y=$(j,"In main "),m(x.$$.fragment,j),G=$(j," file we'll import our previously initialized web3-onboard instance and then display our connect wallet button."),j.forEach(p),N=_(s),m(W.$$.fragment,s),v=U(s,"H2",{id:!0,tabindex:!0});var J=O(v);m(M.$$.fragment,J),L=$(J," Step 3: Display account information"),J.forEach(p),H=_(s),q=U(s,"P",{});var Z=O(q);V=$(Z,"Now that we have our wallet connected, let's display some basic information, such as the connected wallet's address, ENS name, and avatar."),Z.forEach(p),T=_(s),m(B.$$.fragment,s),this.h()},h(){S(n,"id","step-1-import-configure"),S(n,"tabindex","-1"),S(y,"id","step-2-display-the-connect-wallet-button"),S(y,"tabindex","-1"),S(v,"id","step-3-display-account-information"),S(v,"tabindex","-1")},m(s,o){c(s,n,o),u(a,n,null),I(n,l),c(s,r,o),c(s,e,o),I(e,i),c(s,h,o),u(C,s,o),c(s,y,o),u(A,y,null),I(y,t),c(s,F,o),c(s,g,o),I(g,Y),u(x,g,null),I(g,G),c(s,N,o),u(W,s,o),c(s,v,o),u(M,v,null),I(v,L),c(s,H,o),c(s,q,o),I(q,V),c(s,T,o),u(B,s,o),R=!0},p(s,[o]){const K={};o&1&&(K.$$scope={dirty:o,ctx:s}),a.$set(K);const z={};o&1&&(z.$$scope={dirty:o,ctx:s}),A.$set(z);const j={};o&1&&(j.$$scope={dirty:o,ctx:s}),M.$set(j)},i(s){R||(f(a.$$.fragment,s),f(C.$$.fragment,s),f(A.$$.fragment,s),f(x.$$.fragment,s),f(W.$$.fragment,s),f(M.$$.fragment,s),f(B.$$.fragment,s),R=!0)},o(s){b(a.$$.fragment,s),b(C.$$.fragment,s),b(A.$$.fragment,s),b(x.$$.fragment,s),b(W.$$.fragment,s),b(M.$$.fragment,s),b(B.$$.fragment,s),R=!1},d(s){s&&p(n),w(a),s&&p(r),s&&p(e),s&&p(h),w(C,s),s&&p(y),w(A),s&&p(F),s&&p(g),w(x),s&&p(N),w(W,s),s&&p(v),w(M),s&&p(H),s&&p(q),s&&p(T),w(B,s)}}}class hs extends ss{constructor(n){super(),ns(this,n,null,gs,as,{})}}function vs(D){let n,a;return n=new bs({}),{c(){d(n.$$.fragment)},l(l){m(n.$$.fragment,l)},m(l,r){u(n,l,r),a=!0},i(l){a||(f(n.$$.fragment,l),a=!0)},o(l){b(n.$$.fragment,l),a=!1},d(l){w(n,l)}}}function Ms(D){let n,a;return n=new hs({}),{c(){d(n.$$.fragment)},l(l){m(n.$$.fragment,l)},m(l,r){u(n,l,r),a=!0},i(l){a||(f(n.$$.fragment,l),a=!0)},o(l){b(n.$$.fragment,l),a=!1},d(l){w(n,l)}}}function ks(D){let n,a,l,r;return n=new ls({props:{value:"react",$$slots:{default:[vs]},$$scope:{ctx:D}}}),l=new ls({props:{value:"svelte",$$slots:{default:[Ms]},$$scope:{ctx:D}}}),{c(){d(n.$$.fragment),a=k(),d(l.$$.fragment)},l(e){m(n.$$.fragment,e),a=_(e),m(l.$$.fragment,e)},m(e,i){u(n,e,i),c(e,a,i),u(l,e,i),r=!0},p(e,i){const h={};i&4&&(h.$$scope={dirty:i,ctx:e}),n.$set(h);const C={};i&4&&(C.$$scope={dirty:i,ctx:e}),l.$set(C)},i(e){r||(f(n.$$.fragment,e),f(l.$$.fragment,e),r=!0)},o(e){b(n.$$.fragment,e),b(l.$$.fragment,e),r=!1},d(e){w(n,e),e&&p(a),w(l,e)}}}function _s(D){let n,a=D[0].title+"",l,r,e,i,h,C,y,A;return e=new is({}),y=new Fs({props:{values:D[1],$$slots:{default:[ks]},$$scope:{ctx:D}}}),{c(){n=P("h1"),l=E(a),r=k(),d(e.$$.fragment),i=k(),h=P("div"),C=k(),d(y.$$.fragment),this.h()},l(t){n=U(t,"H1",{});var F=O(n);l=$(F,a),F.forEach(p),r=_(t),m(e.$$.fragment,t),i=_(t),h=U(t,"DIV",{class:!0}),O(h).forEach(p),C=_(t),m(y.$$.fragment,t),this.h()},h(){S(h,"class","w-full h-5")},m(t,F){c(t,n,F),I(n,l),c(t,r,F),u(e,t,F),c(t,i,F),c(t,h,F),c(t,C,F),u(y,t,F),A=!0},p(t,[F]){(!A||F&1)&&a!==(a=t[0].title+"")&&ts(l,a);const g={};F&4&&(g.$$scope={dirty:F,ctx:t}),y.$set(g)},i(t){A||(f(e.$$.fragment,t),f(y.$$.fragment,t),A=!0)},o(t){b(e.$$.fragment,t),b(y.$$.fragment,t),A=!1},d(t){t&&p(n),t&&p(r),w(e,t),t&&p(i),t&&p(h),t&&p(C),w(y,t)}}}function xs(D,n,a){let l;return cs(D,ys,e=>a(0,l=e)),[l,["react","svelte"]]}class Ys extends ss{constructor(n){super(),ns(this,n,xs,_s,as,{})}}export{Ys as default};
