import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index-8615df27.js";
import { C as CodeFence } from "../../../../chunks/CodeFence-7825ab22.js";
import "clsx";
import { L as Link } from "../../../../chunks/Link-6f161fc2.js";
/* empty css                                                                 */import { T as Tabs, a as TabPanel } from "../../../../chunks/Tabs-dd4460a7.js";
import "../../../../chunks/contexts-8ef4e4d1.js";
import "../../../../chunks/ssr-eca022de.js";
const Ledger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1>@web3-onboard/ledger</h1>
<p>Wallet module for connecting Ledger hardware wallets to web3-onboard</p>
<h2 id="${"install"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#install",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Install</h2>
${validate_component(Tabs, "Tabs").$$render($$result, { values: ["yarn", "npm"] }, {}, {
    default: () => {
      return `${validate_component(TabPanel, "TabPanel").$$render($$result, { value: "yarn" }, {}, {
        default: () => {
          return `${validate_component(CodeFence, "CodeFence").$$render($$result, {
            lang: "bash",
            ext: "sh",
            linesCount: 2,
            rawCode: "yarn add @web3-onboard/ledger\n",
            showCopyCode: true,
            code: '<pre><code><span class="line"><span style="color: #A6ACCD">yarn add @web3-onboard/ledger</span></span>\n<span class="line"></span></code></pre>'
          }, {}, {})}`;
        }
      })}
  ${validate_component(TabPanel, "TabPanel").$$render($$result, { value: "npm" }, {}, {
        default: () => {
          return `${validate_component(CodeFence, "CodeFence").$$render($$result, {
            lang: "bash",
            ext: "sh",
            linesCount: 2,
            rawCode: "npm install @web3-onboard/ledger\n",
            showCopyCode: true,
            code: '<pre><code><span class="line"><span style="color: #A6ACCD">npm install @web3-onboard/ledger</span></span>\n<span class="line"></span></code></pre>'
          }, {}, {})}`;
        }
      })}`;
    }
  })}
<h2 id="${"options"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#options",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Options</h2>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "typescript",
    ext: "ts",
    linesCount: 36,
    code: '<pre><code><span class="line"><span style="color: #C792EA">type</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">LedgerOptions</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">customNetwork</span><span style="color: #89DDFF">?:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">CustomNetwork</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">interface</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">CustomNetwork</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">networkId</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">number</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">genesis</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">GenesisBlock</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">hardforks</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">Hardfork</span><span style="color: #A6ACCD">[]</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">bootstrapNodes</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">BootstrapNode</span><span style="color: #A6ACCD">[]</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">interface</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">GenesisBlock</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">hash</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">timestamp</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">|</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">null</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">gasLimit</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">number</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">difficulty</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">number</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">nonce</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">extraData</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">stateRoot</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">interface</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">Hardfork</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">block</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">number</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">|</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">null</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">interface</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">BootstrapNode</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">ip</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">port</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">number</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">|</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">network</span><span style="color: #89DDFF">?:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">chainId</span><span style="color: #89DDFF">?:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">number</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">id</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">location</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">comment</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"></span></code></pre>'
  }, {}, {})}<h2 id="${"usage"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#usage",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Usage</h2>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "typescript",
    ext: "ts",
    linesCount: 16,
    code: '<pre><code><span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> Onboard </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/core</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> ledgerModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/ledger</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> ledger </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">ledgerModule</span><span style="color: #A6ACCD">()</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> onboard </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">Onboard</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #89DDFF">  </span><span style="color: #464B5D; font-style: italic">// ... other Onboard options</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">wallets</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span></span>\n<span class="line"><span style="color: #A6ACCD">    ledger</span></span>\n<span class="line"><span style="color: #89DDFF">    </span><span style="color: #464B5D; font-style: italic">//... other wallets</span></span>\n<span class="line"><span style="color: #A6ACCD">  ]</span></span>\n<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> connectedWallets </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">await</span><span style="color: #A6ACCD"> onboard</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">connectWallet</span><span style="color: #A6ACCD">()</span></span>\n<span class="line"><span style="color: #A6ACCD">console</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">log</span><span style="color: #A6ACCD">(connectedWallets)</span></span>\n<span class="line"></span></code></pre>'
  }, {}, {})}`;
});
export { Ledger as default };
