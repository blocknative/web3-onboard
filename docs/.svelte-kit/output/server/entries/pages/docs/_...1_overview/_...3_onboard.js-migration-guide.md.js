import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index-8615df27.js";
import { C as CodeFence } from "../../../../chunks/CodeFence-7825ab22.js";
import "clsx";
import { C as CodeInline } from "../../../../chunks/CodeInline-cb589915.js";
import { L as Link } from "../../../../chunks/Link-6f161fc2.js";
/* empty css                                                                 */import "../../../../chunks/contexts-8ef4e4d1.js";
const U5B_3u5Donboard_js_migration_guide = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1>Migration Guide from onboard.js to web3-onboard</h1>
<p>Follow the steps below to easily migrate from onboard.js to Web3-Onboard.</p>
<h3 id="${"background"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#background",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Background</h3>
<p>With Web3-Onboard, we\u2019ve introduced significant architectural changes that provide a more robust and efficient web3 onboarding experience. While this upgrade may result in breaking changes, the improved overall experience makes it worthwhile.</p>
<h3 id="${"steps"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#steps",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Steps</h3>
<p>If you have bnc-onboard installed, you will need to install web3-onboard instead. The basic steps you need to take to get started are:</p>
<ol><li>Install ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "npm i @web3-onboard/core" }, {}, {})}. You can then go ahead and install other specific wallet modules you want (most likely ${validate_component(CodeInline, "CodeInline").$$render($$result, {
    code: "npm i @web3-onboard/injected-wallets"
  }, {}, {})} for browser wallet support).</li>
<li>Initialize Onboard with the wallets you\u2019ve installed along with the networks you would like to support.</li>
<li>Make use of our API actions like ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "await onboard.connectWallet()" }, {}, {})} to allow a user to connect their wallets.</li></ol>
<p>For a full code overview of the upgrade process using the React Hooks package please see ${validate_component(Link, "Link").$$render($$result, {
    href: "https://github.com/blocknative/react-demo/pull/160/files",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `this PR`;
    }
  })} with special attention to the ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "App.js" }, {}, {})} and ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "services.js" }, {}, {})} files.
To help you get started quickly we\u2019ve put together ${validate_component(Link, "Link").$$render($$result, {
    href: "https://github.com/blocknative/web3-onboard/tree/v2-web3-onboard-develop/examples",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `a set of examples across multiple frameworks that includes the above-mentioned steps`;
    }
  })}.</p>
<h3 id="${"package-upgrade-modularization"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#package-upgrade-modularization",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Package Upgrade - Modularization</h3>
<p>This is the biggest change you might experience as an onboard.js user. With Web3-Onboard, we\u2019ve separated all supported wallets into their modules, meaning you only need to integrate specific wallet modules you intend to support in your app.
For example with Onboard, if you wanted to support only Metamask and Coinbase in your app, you had to install Onboard complete with all other wallets: ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "npm install bnc-onboard" }, {}, {})}.
With Web3-Onboard, you only need to install core along with the desired wallet modules: ${validate_component(CodeInline, "CodeInline").$$render($$result, {
    code: "npm i @web3-onboard/core @web3-onboard/injected-wallets @web3-onboard/coinbase"
  }, {}, {})}
This change allows us to support many web3 wallets without affecting the overall library performance.</p>
<h3 id="${"expansive-initialization-options"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#expansive-initialization-options",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Expansive Initialization Options</h3>
<p>We\u2019ve made initialization simpler while introducing more powerful options like ${validate_component(Link, "Link").$$render($$result, {
    href: "https://www.blocknative.com/blog/multichain-and-multiwallet-account-management-on-your-dapp-with-account-center",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `Account Center`;
    }
  })} and Notify in Web3-Onboard.
Onboard now requires two compulsory initial setup options: ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "wallets" }, {}, {})} (Wallet modules, as shown above, to be initialized and added to wallet selection modal) and ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "chains" }, {}, {})} (EVM networks your app should work with). You can also pass multiple wallets and chains.</p>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "text",
    ext: "text",
    linesCount: 12,
    code: '<pre><code><span class="line"><span style="color: undefined">const onboard = Onboard({</span></span>\n<span class="line"><span style="color: undefined"> wallets: [injected, coinbase],</span></span>\n<span class="line"><span style="color: undefined"> chains: [</span></span>\n<span class="line"><span style="color: undefined">   {</span></span>\n<span class="line"><span style="color: undefined">     id: &#39;0x1&#39;,</span></span>\n<span class="line"><span style="color: undefined">     token: &#39;ETH&#39;,</span></span>\n<span class="line"><span style="color: undefined">     label: &#39;Ethereum Mainnet&#39;,</span></span>\n<span class="line"><span style="color: undefined">     rpcUrl: MAINNET_RPC_URL</span></span>\n<span class="line"><span style="color: undefined">   }</span></span>\n<span class="line"><span style="color: undefined"> ]</span></span>\n<span class="line"><span style="color: undefined">})</span></span>\n<span class="line"><span style="color: undefined"></span></span></code></pre>'
  }, {}, {})}<p>You can find the full list of initialization options in our docs ${validate_component(Link, "Link").$$render($$result, { href: "/docs/packages/core#options" }, {}, {
    default: () => {
      return `here`;
    }
  })}.</p>
<h3 id="${"api-upgrades"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#api-upgrades",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} API Upgrades</h3>
<p>We&#39;ve also added a number of API enhancements to help you create an onboarding experience faster. For example, previously, you had to call ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "walletSelect" }, {}, {})} and ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "walletCheck" }, {}, {})} API to get a user connected: ${validate_component(CodeInline, "CodeInline").$$render($$result, {
    code: "await onboard.walletSelect(); await onboard.walletCheck();"
  }, {}, {})}
Now, you only need to call the connectWallet API:</p>
<p>${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "await onboard.connectWallet()" }, {}, {})}</p>
<p>Learn more about state changes tracked with the Onboard API ${validate_component(Link, "Link").$$render($$result, { href: "/docs/packages/core#state" }, {}, {
    default: () => {
      return `here`;
    }
  })} and the exposed actions you can use to modify the state ${validate_component(Link, "Link").$$render($$result, {
    href: "/docs/packages/core#actions-to-modify-state"
  }, {}, {
    default: () => {
      return `here`;
    }
  })}.</p>
<h3 id="${"framework-support"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#framework-support",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Framework Support</h3>
<p>Although Onboard is still framework-agnostic, we\u2019ve introduced a couple of framework-specific modules that are frequently asked for by our users.</p>
<p>${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "@web3-onboard/react" }, {}, {})} - React Hooks to connect users to web3 dApps better. You can check out ${validate_component(Link, "Link").$$render($$result, {
    href: "https://www.blocknative.com/blog/react-hooks-ethereum",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `a comprehensive React Hooks guide`;
    }
  })} we&#39;ve written on it.</p>
<p>${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "@web3-onboard/vue" }, {}, {})} - A set of reusable functions for integrating Web3-Onboard into a Vue 3 project. This is also compatible with a Vue 2 + composition-api dApp.</p>
<h3 id="${"css-customizations"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#css-customizations",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} CSS Customizations</h3>
<p>We&#39;ve also added more expansive custom CSS properties so you can style every part of your onboarding experience to match the overall experience of your dApp. To apply Web3-Onboard CSS customizations, you don&#39;t need to attach them to the ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: ".bn-onboard-custom" }, {}, {})} class like before. Instead, you can simply place them in the ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: ":root" }, {}, {})} CSS pseudo-class, as shown below:</p>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "text",
    ext: "text",
    linesCount: 18,
    code: '<pre><code><span class="line"><span style="color: undefined">:root {</span></span>\n<span class="line"><span style="color: undefined"> /* CUSTOMIZE THE COLOR  PALLETTE */</span></span>\n<span class="line"><span style="color: undefined"> --onboard-success-100: #d1fae3;</span></span>\n<span class="line"><span style="color: undefined"> /* CUSTOMIZE ACCOUNT CENTER*/</span></span>\n<span class="line"><span style="color: undefined"> --account-center-z-index: 30</span></span>\n<span class="line"><span style="color: undefined">/* CUSTOMIZE THE SHARED MODAL */</span></span>\n<span class="line"><span style="color: undefined"> --onboard-modal-color: #ffe5e6;</span></span>\n<span class="line"><span style="color: undefined"> /* CUSTOMIZE THE CONNECT MODAL */</span></span>\n<span class="line"><span style="color: undefined"> --onboard-font-size-1: 3rem;</span></span>\n<span class="line"><span style="color: undefined"> /* HD WALLET ACCOUNT SELECT MODAL POSITIONING */</span></span>\n<span class="line"><span style="color: undefined"> --onboard-account-select-modal-z-index : 1;</span></span>\n<span class="line"><span style="color: undefined">/* COLORS */</span></span>\n<span class="line"><span style="color: undefined"> --account-select-modal-primary-100: #eff1fc;</span></span>\n<span class="line"><span style="color: undefined"> /* SPACING */</span></span>\n<span class="line"><span style="color: undefined"> --account-select-modal-margin-5: 0.5rem;</span></span>\n<span class="line"><span style="color: undefined">/* AND MANY MORE ALLOWING COMPLETE CUSTOMIZATION OF YOUR ONBOARDING EXPERIENCE */</span></span>\n<span class="line"><span style="color: undefined">}</span></span>\n<span class="line"><span style="color: undefined"></span></span></code></pre>'
  }, {}, {})}<p>The full list of CSS variables for web3-onboard are available ${validate_component(Link, "Link").$$render($$result, {
    href: "/docs/packages/core#custom-styling"
  }, {}, {
    default: () => {
      return `here`;
    }
  })}.</p>
<h3 id="${"other-important-changes"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#other-important-changes",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Other Important Changes</h3>
<p>There are also other notable infrastructural changes in Web3-Onboard:</p>
<ul><li>Dynamic Imports of dependencies</li>
<li>Wallet Provider Standardization</li>
<li>Support for Chain ID in decimal format</li></ul>
<h3 id="${"questions-and-requests"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#questions-and-requests",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Questions and Requests</h3>
<p>If you have questions or requests, please feel free to drop by the ${validate_component(Link, "Link").$$render($$result, {
    href: "https://discord.com/channels/542403978693050389/542406894677917699",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `community-support discord channel`;
    }
  })} or ${validate_component(Link, "Link").$$render($$result, {
    href: "https://github.com/blocknative/web3-onboard/issues/new/choose",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `create a PR or issue on GitHub`;
    }
  })}.</p>`;
});
export { U5B_3u5Donboard_js_migration_guide as default };
