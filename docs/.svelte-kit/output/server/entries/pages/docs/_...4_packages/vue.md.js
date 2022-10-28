import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index-8615df27.js";
import { C as CodeFence } from "../../../../chunks/CodeFence-7825ab22.js";
import "clsx";
import { C as CodeInline } from "../../../../chunks/CodeInline-cb589915.js";
import { L as Link } from "../../../../chunks/Link-6f161fc2.js";
/* empty css                                                                 */import { T as Tabs, a as TabPanel } from "../../../../chunks/Tabs-dd4460a7.js";
import "../../../../chunks/contexts-8ef4e4d1.js";
import "../../../../chunks/ssr-eca022de.js";
const Vue = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1>@web3-onboard/vue</h1>
<p>A collection of composable functions for implementing web3-onboard in to a Vue project; compatible both with Vue 2 + composition-api and Vue 3</p>
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
            rawCode: "yarn add @web3-onboard/vue\n",
            showCopyCode: true,
            code: '<pre><code><span class="line"><span style="color: #A6ACCD">yarn add @web3-onboard/vue</span></span>\n<span class="line"></span></code></pre>'
          }, {}, {})}`;
        }
      })}
  ${validate_component(TabPanel, "TabPanel").$$render($$result, { value: "npm" }, {}, {
        default: () => {
          return `${validate_component(CodeFence, "CodeFence").$$render($$result, {
            lang: "bash",
            ext: "sh",
            linesCount: 2,
            rawCode: "npm install @web3-onboard/vue\n",
            showCopyCode: true,
            code: '<pre><code><span class="line"><span style="color: #A6ACCD">npm install @web3-onboard/vue</span></span>\n<span class="line"></span></code></pre>'
          }, {}, {})}`;
        }
      })}`;
    }
  })}
<h2 id="${"quickstart"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#quickstart",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Quickstart</h2>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "typescript",
    ext: "ts",
    linesCount: 26,
    code: '<pre><code><span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">init</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/vue</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> injectedModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/injected-wallets</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> injected </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">injectedModule</span><span style="color: #A6ACCD">()</span></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> infuraKey </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">&lt;INFURA_KEY&gt;</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> rpcUrl </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">`</span><span style="color: #C3E88D">https://mainnet.infura.io/v3/</span><span style="color: #89DDFF">${</span><span style="color: #A6ACCD">infuraKey</span><span style="color: #89DDFF">}`</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> web3Onboard </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">init</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">wallets</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [injected]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">chains</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">id</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0x1</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">token</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">ETH</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">label</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Ethereum Mainnet</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      rpcUrl</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #A6ACCD">  ]</span></span>\n<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> wallets</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> connectWallet</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> disconnectConnectedWallet</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> connectedWallet </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">useOnboard</span><span style="color: #A6ACCD">()</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">if</span><span style="color: #A6ACCD"> (connectedWallet) </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">ethersProvider</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #89DDFF">new</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">ethers</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">providers</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">Web3Provider</span><span style="color: #F07178">(</span><span style="color: #A6ACCD">connectedWallet</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">provider</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">any</span><span style="color: #89DDFF">&#39;</span><span style="color: #F07178">)</span></span>\n<span class="line"><span style="color: #89DDFF">  </span><span style="color: #464B5D; font-style: italic">// ..... do stuff with the provider</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"></span></code></pre>'
  }, {}, {})}<h2 id="${"functions"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#functions",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Functions</h2>
<h2 id="${"init"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#init",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "init" }, {}, {})}</h2>
<p>The ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "init" }, {}, {})} function initializes ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "web3-onboard" }, {}, {})} and makes it available to the ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "useOnboard()" }, {}, {})} composable. For references check out the ${validate_component(Link, "Link").$$render($$result, {
    href: "/docs/packages/core#initialization"
  }, {}, {
    default: () => {
      return `initialization docs for ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "@web3-onboard/core" }, {}, {})}`;
    }
  })}</p>
<h3 id="${"example-usage"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#example-usage",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Example usage</h3>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "typescript",
    ext: "ts",
    linesCount: 19,
    code: '<pre><code><span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">init</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/vue</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> injectedModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/injected-wallets</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> injected </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">injectedModule</span><span style="color: #A6ACCD">()</span></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> infuraKey </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">&lt;INFURA_KEY&gt;</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> rpcUrl </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">`</span><span style="color: #C3E88D">https://mainnet.infura.io/v3/</span><span style="color: #89DDFF">${</span><span style="color: #A6ACCD">infuraKey</span><span style="color: #89DDFF">}`</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> web3Onboard </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">init</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">wallets</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [injected]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">chains</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">id</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0x1</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">token</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">ETH</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">label</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">Ethereum Mainnet</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      rpcUrl</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #A6ACCD">  ]</span></span>\n<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>\n<span class="line"></span></code></pre>'
  }, {}, {})}<h2 id="${"useonboard"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#useonboard",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "useOnboard" }, {}, {})}</h2>
<p>${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "useOnboard" }, {}, {})} must be used after the ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "init" }, {}, {})} function has been called - it will return an object that can be destructured to obtain the following reactive variables and functions:</p>
<h3 id="${"example-usage-1"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#example-usage-1",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Example usage</h3>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "typescript",
    ext: "ts",
    linesCount: 7,
    code: '<pre><code><span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useOnboard</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/vue</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #464B5D; font-style: italic">// Use the composable</span></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> onboard </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">useOnboard</span><span style="color: #A6ACCD">()</span></span>\n<span class="line"><span style="color: #464B5D; font-style: italic">// Or destructure it</span></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> wallets</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> connectWallet</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> disconnectConnectedWallet</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> connectedWallet </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">useOnboard</span><span style="color: #A6ACCD">()</span></span>\n<span class="line"><span style="color: #464B5D; font-style: italic">// do stuff</span></span>\n<span class="line"></span></code></pre>'
  }, {}, {})}<h3 id="${"connectwallet"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#connectwallet",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "connectWallet" }, {}, {})}</h3>
<p>Function to open the onboard modal and connect to a wallet provider. For reference check out the ${validate_component(Link, "Link").$$render($$result, {
    href: "/docs/packages/core#connecting-a-wallet"
  }, {}, {
    default: () => {
      return `connecting a wallet for ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "@web3-onboard/core" }, {}, {})}`;
    }
  })}</p>
<h3 id="${"example-usage-2"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#example-usage-2",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Example usage</h3>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "vue",
    ext: "vue",
    linesCount: 15,
    code: '<pre><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useOnboard</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/vue</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">export</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">default</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">setup</span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">connectWallet</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #82AAFF">useOnboard</span><span style="color: #F07178">()</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">connect</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #C792EA">async</span><span style="color: #F07178"> </span><span style="color: #89DDFF">()</span><span style="color: #F07178"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #F07178"> </span><span style="color: #82AAFF">connectWallet</span><span style="color: #F07178">()</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF; font-style: italic">return</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">connect</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">button</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">type</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">button</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> @</span><span style="color: #C792EA">click</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #A6ACCD">connect</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span><span style="color: #A6ACCD">Connect to a Wallet</span><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">button</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span></code></pre>'
  }, {}, {})}<h3 id="${"connectedchain"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#connectedchain",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "connectedChain" }, {}, {})}</h3>
<p>Computed property that contains the current chain to which ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "connectedWallet" }, {}, {})} is connected</p>
<h3 id="${"example-usage-3"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#example-usage-3",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Example usage</h3>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "vue",
    ext: "vue",
    linesCount: 14,
    code: '<pre><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useOnboard</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/vue</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">export</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">default</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">setup</span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">connectedChain</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #82AAFF">useOnboard</span><span style="color: #F07178">()</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF; font-style: italic">return</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">connectedChain</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">span</span><span style="color: #89DDFF">&gt;</span><span style="color: #A6ACCD">Connected Chain: </span><span style="color: #89DDFF">{{</span><span style="color: #A6ACCD"> connectedChain</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">id </span><span style="color: #89DDFF">}}&lt;/</span><span style="color: #F07178">span</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span></code></pre>'
  }, {}, {})}<h3 id="${"connectedwallet"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#connectedwallet",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "connectedWallet" }, {}, {})}</h3>
<p>Computed property that contains the latest connected wallet</p>
<h3 id="${"example-usage-4"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#example-usage-4",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Example usage</h3>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "vue",
    ext: "vue",
    linesCount: 14,
    code: '<pre><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useOnboard</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/vue</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">export</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">default</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">setup</span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">connectedWallet</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #82AAFF">useOnboard</span><span style="color: #F07178">()</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF; font-style: italic">return</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">connectedWallet</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">span</span><span style="color: #89DDFF">&gt;</span><span style="color: #A6ACCD">Connected Wallet: </span><span style="color: #89DDFF">{{</span><span style="color: #A6ACCD"> connectedWallet</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">label </span><span style="color: #89DDFF">}}&lt;/</span><span style="color: #F07178">span</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span></code></pre>'
  }, {}, {})}<h3 id="${"connectingwallet"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#connectingwallet",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "connectingWallet" }, {}, {})}</h3>
<p>Readonly boolean ref that tracks the state of the wallet connection status</p>
<h3 id="${"example-usage-5"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#example-usage-5",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Example usage</h3>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "vue",
    ext: "vue",
    linesCount: 14,
    code: '<pre><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useOnboard</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/vue</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">export</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">default</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">setup</span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">connectingWallet</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #82AAFF">useOnboard</span><span style="color: #F07178">()</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF; font-style: italic">return</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">connectingWallet</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">span</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">v-if</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #A6ACCD">connectingWallet</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span><span style="color: #A6ACCD">Connecting...</span><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">span</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span></code></pre>'
  }, {}, {})}<h3 id="${"disconnectwallet"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#disconnectwallet",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "disconnectWallet" }, {}, {})}</h3>
<p>Function to disconnect a specific wallet</p>
<h3 id="${"example-usage-6"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#example-usage-6",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Example usage</h3>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "vue",
    ext: "vue",
    linesCount: 15,
    code: '<pre><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useOnboard</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/vue</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">export</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">default</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">setup</span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">disconnectWallet</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #82AAFF">useOnboard</span><span style="color: #F07178">()</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">disconnect</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #C792EA">async</span><span style="color: #F07178"> </span><span style="color: #89DDFF">()</span><span style="color: #F07178"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #F07178"> </span><span style="color: #82AAFF">disconnectWallet</span><span style="color: #F07178">(</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">MetaMask</span><span style="color: #89DDFF">&#39;</span><span style="color: #F07178">)</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF; font-style: italic">return</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">disconnect</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">button</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">type</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">button</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> @</span><span style="color: #C792EA">click</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #A6ACCD">disconnect</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span><span style="color: #A6ACCD">Disconnect MetaMask</span><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">button</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span></code></pre>'
  }, {}, {})}<h3 id="${"disconnectconnectedwallet"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#disconnectconnectedwallet",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "disconnectConnectedWallet" }, {}, {})}</h3>
<p>Function to disconnect the ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "connectedWallet" }, {}, {})}</p>
<h3 id="${"example-usage-7"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#example-usage-7",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Example usage</h3>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "vue",
    ext: "vue",
    linesCount: 14,
    code: '<pre><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useOnboard</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/vue</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">export</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">default</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">setup</span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">disconnectConnectedWallet</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #82AAFF">useOnboard</span><span style="color: #F07178">()</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF; font-style: italic">return</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">disconnectConnectedWallet</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">button</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">type</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">button</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> @</span><span style="color: #C792EA">click</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #A6ACCD">disconnectConnectedWallet</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span><span style="color: #A6ACCD">Disconnect connectedWallet</span><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">button</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span></code></pre>'
  }, {}, {})}<h3 id="${"getchain"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#getchain",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "getChain" }, {}, {})}</h3>
<p>Function that returns the current chain a wallet is connected to</p>
<h3 id="${"example-usage-8"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#example-usage-8",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Example usage</h3>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "vue",
    ext: "vue",
    linesCount: 14,
    code: '<pre><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useOnboard</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/vue</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">export</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">default</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">setup</span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">getChain</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #82AAFF">useOnboard</span><span style="color: #F07178">()</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF; font-style: italic">return</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">getChain</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">span</span><span style="color: #89DDFF">&gt;</span><span style="color: #A6ACCD">MetaMask is connected to: </span><span style="color: #89DDFF">{{</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">getChain</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">MetaMask</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">) </span><span style="color: #89DDFF">}}&lt;/</span><span style="color: #F07178">span</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span></code></pre>'
  }, {}, {})}<h3 id="${"setchain"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#setchain",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "setChain" }, {}, {})}</h3>
<p>Function to set the chain of a wallet</p>
<h3 id="${"example-usage-9"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#example-usage-9",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Example usage</h3>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "vue",
    ext: "vue",
    linesCount: 15,
    code: '<pre><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useOnboard</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/vue</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">export</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">default</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">setup</span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">setChain</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #82AAFF">useOnboard</span><span style="color: #F07178">()</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">set</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #89DDFF">()</span><span style="color: #F07178"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #F07178"> </span><span style="color: #82AAFF">setChain</span><span style="color: #F07178">(</span><span style="color: #89DDFF">{</span><span style="color: #F07178"> wallet</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">MetaMask</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> chainId</span><span style="color: #89DDFF">:</span><span style="color: #F07178"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0x1</span><span style="color: #89DDFF">&#39;</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #F07178">)</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF; font-style: italic">return</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">set</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">button</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">type</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">button</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> @</span><span style="color: #C792EA">click</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #A6ACCD">set</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span><span style="color: #A6ACCD">Set MetaMask chain to mainnet</span><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">button</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span></code></pre>'
  }, {}, {})}<h3 id="${"settingchain"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#settingchain",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "settingChain" }, {}, {})}</h3>
<p>Readonly boolean ref that tracks the status of setting the chain</p>
<h3 id="${"example-usage-10"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#example-usage-10",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Example usage</h3>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "vue",
    ext: "vue",
    linesCount: 14,
    code: '<pre><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useOnboard</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/vue</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">export</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">default</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">setup</span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">settingChain</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #82AAFF">useOnboard</span><span style="color: #F07178">()</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF; font-style: italic">return</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">settingChain</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">span</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">v-if</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #A6ACCD">settingChain</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span><span style="color: #A6ACCD">Setting chain...</span><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">span</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span></code></pre>'
  }, {}, {})}<h3 id="${"wallets"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#wallets",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "wallets" }, {}, {})}</h3>
<p>Readonly ref that contains every wallet that has been connected</p>
<h3 id="${"example-usage-11"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#example-usage-11",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Example usage</h3>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "vue",
    ext: "vue",
    linesCount: 9,
    code: '<pre><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">useOnboard</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/vue</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">export</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">default</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">setup</span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">wallets</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #82AAFF">useOnboard</span><span style="color: #F07178">()</span></span>\n<span class="line"><span style="color: #F07178">    </span><span style="color: #89DDFF; font-style: italic">return</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">wallets</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">}</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"></span></code></pre>'
  }, {}, {})}<h3 id="${"alreadyconnectedwallets"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#alreadyconnectedwallets",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "alreadyConnectedWallets" }, {}, {})}</h3>
<p>Readonly ref that contains every wallet that user connected to in the past; useful to reconnect wallets automatically after a reload</p>
<h3 id="${"example-usage-12"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#example-usage-12",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Example usage</h3>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "text",
    ext: "text",
    linesCount: 17,
    code: '<pre><code><span class="line"><span style="color: undefined">vue</span></span>\n<span class="line"><span style="color: undefined">&lt;script&gt;</span></span>\n<span class="line"><span style="color: undefined">import { useOnboard } from &#39;@web3-onboard/vue&#39;</span></span>\n<span class="line"><span style="color: undefined">export default {</span></span>\n<span class="line"><span style="color: undefined">  setup() {</span></span>\n<span class="line"><span style="color: undefined">    const { alreadyConnectedWallets } = useOnboard()</span></span>\n<span class="line"><span style="color: undefined">    return { alreadyConnectedWallets }</span></span>\n<span class="line"><span style="color: undefined">  }</span></span>\n<span class="line"><span style="color: undefined">}</span></span>\n<span class="line"><span style="color: undefined">&lt;/script&gt;</span></span>\n<span class="line"><span style="color: undefined"></span></span>\n<span class="line"><span style="color: undefined">&lt;template&gt;</span></span>\n<span class="line"><span style="color: undefined">  &lt;div v-for=&quot;wallet in wallets&quot;&gt;</span></span>\n<span class="line"><span style="color: undefined">    &lt;span&gt;Label: {{wallet.label}}&lt;/span&gt;</span></span>\n<span class="line"><span style="color: undefined">  &lt;/div&gt;</span></span>\n<span class="line"><span style="color: undefined">&lt;/template&gt;</span></span>\n<span class="line"><span style="color: undefined"></span></span></code></pre>'
  }, {}, {})}<h3 id="${"lastconnectedtimestamp"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#lastconnectedtimestamp",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "lastConnectedTimestamp" }, {}, {})}</h3>
<p>Readonly ref that contains the last time that the user connected a wallet in milliseconds</p>
<h3 id="${"example-usage-13"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#example-usage-13",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Example usage</h3>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "text",
    ext: "text",
    linesCount: 15,
    code: '<pre><code><span class="line"><span style="color: undefined">vue</span></span>\n<span class="line"><span style="color: undefined">&lt;script&gt;</span></span>\n<span class="line"><span style="color: undefined">import { useOnboard } from &#39;@web3-onboard/vue&#39;</span></span>\n<span class="line"><span style="color: undefined">export default {</span></span>\n<span class="line"><span style="color: undefined">  setup() {</span></span>\n<span class="line"><span style="color: undefined">    const { lastConnectedTimestamp } = useOnboard()</span></span>\n<span class="line"><span style="color: undefined">    return { lastConnectedTimestamp }</span></span>\n<span class="line"><span style="color: undefined">  }</span></span>\n<span class="line"><span style="color: undefined">}</span></span>\n<span class="line"><span style="color: undefined">&lt;/script&gt;</span></span>\n<span class="line"><span style="color: undefined"></span></span>\n<span class="line"><span style="color: undefined">&lt;template&gt;</span></span>\n<span class="line"><span style="color: undefined">  &lt;span&gt;Your last connection timestamp was: {{ lastConnectedTimestamp }}&lt;/span&gt;</span></span>\n<span class="line"><span style="color: undefined">&lt;/template&gt;</span></span>\n<span class="line"><span style="color: undefined"></span></span></code></pre>'
  }, {}, {})}`;
});
export { Vue as default };
