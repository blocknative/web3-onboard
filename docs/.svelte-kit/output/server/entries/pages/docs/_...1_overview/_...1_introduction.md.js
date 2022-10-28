import { c as create_ssr_component, a as add_attribute, v as validate_component } from "../../../../chunks/index-8615df27.js";
import { C as CodeFence } from "../../../../chunks/CodeFence-7825ab22.js";
import "clsx";
import { C as CodeInline } from "../../../../chunks/CodeInline-cb589915.js";
import { L as Link } from "../../../../chunks/Link-6f161fc2.js";
/* empty css                                                                 */import { T as Tabs, a as TabPanel } from "../../../../chunks/Tabs-dd4460a7.js";
import "../../../../chunks/contexts-8ef4e4d1.js";
import "../../../../chunks/ssr-eca022de.js";
var walletModal = "/_app/immutable/assets/connect-modal-b7439c5e.svg";
const U5B_1u5Dintroduction = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1>Web3-Onboard</h1>
<p>The best way to connect a wallet \u{1F680}</p>
<img${add_attribute("src", walletModal, 0)} alt="${"Web3-Onboard connect wallet modal"}">
<p>Web3-Onboard is the quickest and easiest way to add multi-wallet and multi-chain support to your project. With built-in modules for more than 35 unique hardware and software wallets, Web3-Onboard saves you time and headaches.</p>
<h2 id="${"features"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#features",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Features</h2>
<ul><li><p><strong>Minimal Dependencies:</strong> All wallet dependencies are included in separate packages, so you only include the ones you want to use in your app.</p></li>
<li><p><strong>Multiple Wallets and Accounts Connection, Multichain Support:</strong> Allow your users to connect multiple wallets and multiple accounts within each wallet at the same time to your app. Let users switch between chains/networks with ease. ALL EVM networks supported.</p></li>
<li><p><strong>Unified Provider Interface:</strong> All wallet modules expose a provider that is patched to be compliant with the EIP-1193, EIP-1102, EIP-3085 and EIP-3326 specifications. Whether your user is using Ledger or Metamask the provider will operate identically.</p></li>
<li><p><strong>Dynamic Imports:</strong> Supporting multiple wallets in your app requires a lot of dependencies. Onboard dynamically imports a wallet
and it&#39;s dependencies only when the user selects it, so that minimal bandwidth is used.</p></li>
<li><p><strong>Framework Agnostic:</strong> Avoid framework lock in -- Web3-Onboard works with any framework and includes helper packages for vue &amp; react.</p></li>
<li><p><strong>Account Center:</strong> An interface to manage wallet connections and networks, with a minimal version for mobile</p></li>
<li><p><strong>Notify:</strong> Real-time transaction notifications for all transaction states for the connected wallet address(es). In-notification speedups &amp; cancels for hardware wallet connections.</p></li></ul>
<h3 id="${"supported-networks"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#supported-networks",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Supported Networks</h3>
<p>web3-onboard supports all EVM networks. Supporting a new network is simply a matter of adding its details in the Chains section upon initialization. For more information see ${validate_component(Link, "Link").$$render($$result, {
    href: "https://onboard.blocknative.com/docs/packages/core#options",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `initialization options`;
    }
  })}.</p>
<ul><li>Arbitrum</li>
<li>Avalanche</li>
<li>BNB Chain</li>
<li>Celo</li>
<li>Ethereum</li>
<li>Fantom</li>
<li>Gnosis Chain</li>
<li>Harmony One</li>
<li>Moonriver</li>
<li>Optimism</li>
<li>Polygon</li>
<li>Any other EVM network</li></ul>
<h3 id="${"optional-use-an-api-key-to-fetch-real-time-transaction-data-balances-gas"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#optional-use-an-api-key-to-fetch-real-time-transaction-data-balances-gas",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} [Optional] Use an API key to fetch real time transaction data, balances &amp; gas</h3>
<p>Using a Blocknative API key with web3-onboard on the free plan will allow you to gain the benefits of Blocknative balance &amp; transaction services. Blocknative has a free forever plan you can always use.</p>
<p>This step is not required to use web3-onboard. You can skip to the <strong>Quickstart</strong> step below if you want to use web3-onboard without API services or if you already have a Blocknative account &amp; API key.</p>
<p><strong>Setup your Account</strong>
Go to the Account Dashboard at https://explorer.blocknative.com/account and setup an account with an email address. You will receive an email to confirm your account.</p>
<p><strong>Create your API Key</strong>
On the Account Dashboard at https://explorer.blocknative.com/account, create an API key with your choice of name or use/rename the Default Key. Consider using different API keys for development, staging, and production releases.</p>
<h2 id="${"quickstart"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#quickstart",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Quickstart</h2>
<p>Install the core Onboard library, the injected wallets module and optionally ethers.js to support browser extension and mobile wallets:</p>
${validate_component(Tabs, "Tabs").$$render($$result, { values: ["npm", "yarn"] }, {}, {
    default: () => {
      return `${validate_component(TabPanel, "TabPanel").$$render($$result, { value: "yarn" }, {}, {
        default: () => {
          return `${validate_component(CodeFence, "CodeFence").$$render($$result, {
            lang: "bash",
            ext: "sh",
            linesCount: 2,
            rawCode: "yarn add @web3-onboard/core @web3-onboard/injected-wallets ethers\n",
            showCopyCode: true,
            code: '<pre><code><span class="line"><span style="color: #A6ACCD">yarn add @web3-onboard/core @web3-onboard/injected-wallets ethers</span></span>\n<span class="line"></span></code></pre>'
          }, {}, {})}`;
        }
      })}
  ${validate_component(TabPanel, "TabPanel").$$render($$result, { value: "npm" }, {}, {
        default: () => {
          return `${validate_component(CodeFence, "CodeFence").$$render($$result, {
            lang: "bash",
            ext: "sh",
            linesCount: 2,
            rawCode: "npm i @web3-onboard/core @web3-onboard/injected-wallets ethers\n",
            showCopyCode: true,
            code: '<pre><code><span class="line"><span style="color: #A6ACCD">npm i @web3-onboard/core @web3-onboard/injected-wallets ethers</span></span>\n<span class="line"></span></code></pre>'
          }, {}, {})}`;
        }
      })}`;
    }
  })}
<p>You can find a link to web3-onboard&#39;s official NPM Documentation here: ${validate_component(Link, "Link").$$render($$result, {
    href: "https://www.npmjs.com/package/@web3-onboard/core",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `@web3-onboard/core Official NPM Documentation`;
    }
  })}</p>
<p>Then initialize in your app:</p>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "typescript",
    ext: "ts",
    linesCount: 43,
    code: '<pre><code><span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> Onboard </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/core</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> injectedModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/injected-wallets</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">ethers</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">ethers</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> MAINNET_RPC_URL </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">https://mainnet.infura.io/v3/&lt;INFURA_KEY&gt;</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> injected </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">injectedModule</span><span style="color: #A6ACCD">()</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> onboard </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">Onboard</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">wallets</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [injected]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">chains</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">id</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0x1</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">token</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">ETH</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">label</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Ethereum Mainnet</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">rpcUrl</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> MAINNET_RPC_URL</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #A6ACCD">  ]</span></span>\n<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> wallets </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">await</span><span style="color: #A6ACCD"> onboard</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">connectWallet</span><span style="color: #A6ACCD">()</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #A6ACCD">console</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">log</span><span style="color: #A6ACCD">(wallets)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">if</span><span style="color: #A6ACCD"> (wallets[</span><span style="color: #F78C6C">0</span><span style="color: #A6ACCD">]) </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #89DDFF">  </span><span style="color: #464B5D; font-style: italic">// create an ethers provider with the last connected wallet provider</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">ethersProvider</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #89DDFF">new</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">ethers</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">providers</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">Web3Provider</span><span style="color: #F07178">(</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #A6ACCD">wallets</span><span style="color: #F07178">[</span><span style="color: #F78C6C">0</span><span style="color: #F07178">]</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">provider</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">any</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #F07178">  )</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">signer</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">ethersProvider</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">getSigner</span><span style="color: #F07178">()</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">  </span><span style="color: #464B5D; font-style: italic">// send a transaction with the ethers provider</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">txn</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #89DDFF; font-style: italic">await</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">signer</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">sendTransaction</span><span style="color: #F07178">(</span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">    to</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0x</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">    value</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #F78C6C">100000000000000</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">}</span><span style="color: #F07178">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">receipt</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #89DDFF; font-style: italic">await</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">txn</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">wait</span><span style="color: #F07178">()</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #A6ACCD">console</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">log</span><span style="color: #F07178">(</span><span style="color: #A6ACCD">receipt</span><span style="color: #F07178">)</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"></span></code></pre>'
  }, {}, {})}<p><strong>and you are live!</strong></p>
<hr>
<h2 id="${"wallet-modules"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#wallet-modules",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Wallet Modules</h2>
<p>Add other wallet modules such as Wallet Connect or Ledger to increase the support and functionality of your web3-onboard implementation. All modules are listed below and can be accessed through the subpages of web3-onboard docs on the left.</p>
<p>We recommend you add the ${validate_component(Link, "Link").$$render($$result, {
    href: "https://onboard.blocknative.com/docs/packages/core#install",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `Core Repo`;
    }
  })} and consider adding the ${validate_component(Link, "Link").$$render($$result, {
    href: "https://onboard.blocknative.com/docs/packages/injected#install",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `Injected Wallets`;
    }
  })} module to get connected with wallets like Metamask, Tally, Coinbase Wallet &amp; more right away.</p>
<p>${validate_component(Link, "Link").$$render($$result, {
    href: "https://onboard.blocknative.com/docs/packages/core#install",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `<strong>Core Repo</strong>`;
    }
  })}</p>
<p>${validate_component(Link, "Link").$$render($$result, {
    href: "https://onboard.blocknative.com/docs/packages/injected#install",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `<strong>Injected Wallets</strong>`;
    }
  })}</p>
<p><strong>SDK Wallets</strong></p>
<ul><li>${validate_component(Link, "Link").$$render($$result, {
    href: "https://onboard.blocknative.com/docs/packages/coinbase#install",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `Coinbase`;
    }
  })}</li>
<li>${validate_component(Link, "Link").$$render($$result, {
    href: "https://onboard.blocknative.com/docs/packages/walletconnect#install",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `WalletConnect`;
    }
  })}</li>
<li>${validate_component(Link, "Link").$$render($$result, {
    href: "https://onboard.blocknative.com/docs/packages/gnosis#install",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `Gnosis`;
    }
  })}</li>
<li>${validate_component(Link, "Link").$$render($$result, {
    href: "https://onboard.blocknative.com/docs/packages/magic#login-options",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `Magic`;
    }
  })}</li>
<li>${validate_component(Link, "Link").$$render($$result, {
    href: "https://onboard.blocknative.com/docs/packages/formatic#install",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `Fortmatic`;
    }
  })}</li>
<li>${validate_component(Link, "Link").$$render($$result, {
    href: "https://onboard.blocknative.com/docs/packages/mew#install",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `MEW`;
    }
  })}</li>
<li>${validate_component(Link, "Link").$$render($$result, {
    href: "https://onboard.blocknative.com/docs/packages/portis#install",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `Portis`;
    }
  })}</li>
<li>${validate_component(Link, "Link").$$render($$result, {
    href: "https://onboard.blocknative.com/docs/packages/web3auth#install",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `Web3Auth`;
    }
  })}</li></ul>
<p><strong>Hardware Wallets</strong></p>
<ul><li>${validate_component(Link, "Link").$$render($$result, {
    href: "https://onboard.blocknative.com/docs/packages/ledger#install",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `Ledger`;
    }
  })}</li>
<li>${validate_component(Link, "Link").$$render($$result, {
    href: "https://onboard.blocknative.com/docs/packages/trezor#install",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `Trezor`;
    }
  })}</li>
<li>${validate_component(Link, "Link").$$render($$result, {
    href: "https://onboard.blocknative.com/docs/packages/keystone#install",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `Keystone`;
    }
  })}</li>
<li>${validate_component(Link, "Link").$$render($$result, {
    href: "https://onboard.blocknative.com/docs/packages/keepkey#install",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `KeepKey`;
    }
  })}</li>
<li>${validate_component(Link, "Link").$$render($$result, {
    href: "https://onboard.blocknative.com/docs/packages/dcent#wallet-module-for-connecting-d-cent-hardware-wallets-to-web3-onboard",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `D&#39;cent`;
    }
  })}</li></ul>
<p><strong>Frameworks</strong></p>
<ul><li>${validate_component(Link, "Link").$$render($$result, {
    href: "https://onboard.blocknative.com/docs/packages/react#quickstart-with-injected-wallets-and-ethers-provider",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `React`;
    }
  })}</li>
<li>${validate_component(Link, "Link").$$render($$result, {
    href: "https://onboard.blocknative.com/docs/packages/vue#install",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `Vue`;
    }
  })}</li></ul>
<h2 id="${"test-out-the-demo-app"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#test-out-the-demo-app",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Test out the demo app</h2>
<p>Test out the current functionality of web3-onboard in a small browser demo:</p>
<ul><li>Clone the repo: ${validate_component(CodeInline, "CodeInline").$$render($$result, {
    code: "git clone git@github.com:blocknative/web3-onboard.git"
  }, {}, {})}</li>
<li>Change it to the onboard directory: ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "cd web3-onboard" }, {}, {})}</li>
<li>Checkout the main web3-onboard branch: ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "git checkout v2-web3-onboard" }, {}, {})}</li>
<li>Install the dependencies: ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "yarn" }, {}, {})} (if running a M1 mac - ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "yarn install-m1-mac" }, {}, {})})</li>
<li>Run all packages in dev mode: ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "yarn dev" }, {}, {})}</li>
<li>${validate_component(Link, "Link").$$render($$result, {
    href: "http://localhost:8080/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `View demo app in the browser`;
    }
  })}</li></ul>
<h2 id="${"react-demo"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#react-demo",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} React Demo</h2>
<p>Checkout our live demo using React at https://reactdemo.blocknative.com/</p>
<p>The demo is open source so you can see a sample implementation of web3-onboard: https://github.com/blocknative/react-demo</p>
<h2 id="${"more-examples"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#more-examples",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} More Examples</h2>
<p>You can find starter examples from the web3 community here using web3-onboard:</p>
<ul><li>${validate_component(Link, "Link").$$render($$result, {
    href: "https://github.com/scaffold-eth/scaffold-eth-examples/tree/bnc-onboard",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `eth-scaffold`;
    }
  })}</li></ul>`;
});
export { U5B_1u5Dintroduction as default };
