import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index-8615df27.js";
import { C as CodeFence } from "../../../../chunks/CodeFence-7825ab22.js";
import "clsx";
import { C as CodeInline } from "../../../../chunks/CodeInline-cb589915.js";
import { L as Link } from "../../../../chunks/Link-6f161fc2.js";
import { A as Admonition } from "../../../../chunks/Admonition-16022ae4.js";
/* empty css                                                                 */import { T as Tabs, a as TabPanel } from "../../../../chunks/Tabs-dd4460a7.js";
import "../../../../chunks/contexts-8ef4e4d1.js";
import "../../../../chunks/ssr-eca022de.js";
const Magic = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1>@web3-onboard/magic</h1>
<p>Wallet module for connecting Magic wallets to Onboard V2</p>
<h3 id="${"login-options"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#login-options",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Login options</h3>
<ul><li><strong>Email</strong> - The Magic module comes with a built in email login modal that is customizable
in the same fashion that all other web3-onboard UI components are</li></ul>
${validate_component(Admonition, "Admonition").$$render($$result, { type: "note" }, {}, {
    default: () => {
      return `<p>The Magic Module currently only supports email login but we are open to expand to sms or socials*</p>`;
    }
  })}
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
            rawCode: "yarn add @web3-onboard/magic\n",
            showCopyCode: true,
            code: '<pre><code><span class="line"><span style="color: #A6ACCD">yarn add @web3-onboard/magic</span></span>\n<span class="line"></span></code></pre>'
          }, {}, {})}`;
        }
      })}
  ${validate_component(TabPanel, "TabPanel").$$render($$result, { value: "npm" }, {}, {
        default: () => {
          return `${validate_component(CodeFence, "CodeFence").$$render($$result, {
            lang: "bash",
            ext: "sh",
            linesCount: 2,
            rawCode: "npm install @web3-onboard/magic\n",
            showCopyCode: true,
            code: '<pre><code><span class="line"><span style="color: #A6ACCD">npm install @web3-onboard/magic</span></span>\n<span class="line"></span></code></pre>'
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
    linesCount: 5,
    code: '<pre><code><span class="line"><span style="color: #C792EA">type</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">MagicInitOptions</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">apiKey</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">userEmail</span><span style="color: #89DDFF">?:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">string</span><span style="color: #A6ACCD"> </span><span style="color: #464B5D; font-style: italic">// optional - if user has already logged in and/or session is still active a login modal will not appear</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"></span></code></pre>'
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
    linesCount: 19,
    code: '<pre><code><span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> Onboard </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/core</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> magicModule </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/magic</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> magic </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">magicModule</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">apiKey</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">API_KEY</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">userEmail</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> localStorage</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">getItem</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">magicUserEmail</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">)</span></span>\n<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> onboard </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">Onboard</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #89DDFF">  </span><span style="color: #464B5D; font-style: italic">// ... other Onboard options</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">wallets</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span></span>\n<span class="line"><span style="color: #A6ACCD">    magic</span></span>\n<span class="line"><span style="color: #89DDFF">    </span><span style="color: #464B5D; font-style: italic">//... other wallets</span></span>\n<span class="line"><span style="color: #A6ACCD">  ]</span></span>\n<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> connectedWallets </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">await</span><span style="color: #A6ACCD"> onboard</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">connectWallet</span><span style="color: #A6ACCD">()</span></span>\n<span class="line"><span style="color: #A6ACCD">console</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">log</span><span style="color: #A6ACCD">(connectedWallets)</span></span>\n<span class="line"></span></code></pre>'
  }, {}, {})}<h3 id="${"accessing-the-magic-wallet-configuration"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#accessing-the-magic-wallet-configuration",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Accessing the Magic Wallet configuration</h3>
<p>When a Magic wallet is connected the Magic instance is exposed.
This can be used to get information such as user MetaData, update a user&#39;s email address or handle the user&#39;s token.
The user&#39;s email can be set in local storage and passed through the ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "MagicInitOptions" }, {}, {})} to avoid a user having to login again if they are returning to the DApp within the set user session time.
Magic has a default time of 7 days and this can be configured through your Magic API Key settings.</p>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "typescript",
    ext: "ts",
    linesCount: 10,
    code: '<pre><code><span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">[</span><span style="color: #A6ACCD">magicWallet</span><span style="color: #89DDFF">]</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">await</span><span style="color: #A6ACCD"> onboard</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">connectWallet</span><span style="color: #A6ACCD">()</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF; font-style: italic">try</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #C792EA">const</span><span style="color: #F07178"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">email</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">publicAddress</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #F07178"> </span><span style="color: #89DDFF">=</span><span style="color: #F07178"> </span><span style="color: #89DDFF; font-style: italic">await</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">magicWallet</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">instance</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">user</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">getMetadata</span><span style="color: #F07178">()</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #A6ACCD">localStorage</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">setItem</span><span style="color: #F07178">(</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">magicUserEmail</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">email</span><span style="color: #F07178">)</span></span>\n<span class="line"><span style="color: #89DDFF">  </span><span style="color: #464B5D; font-style: italic">// This email can then be passed through the MagicInitOptions to continue the users session and avoid having to login again</span></span>\n<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">catch</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #89DDFF">  </span><span style="color: #464B5D; font-style: italic">// Handle errors if required!</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"></span></code></pre>'
  }, {}, {})}<p>For full documentation and examples please visit ${validate_component(Link, "Link").$$render($$result, {
    href: "https://magic.link/docs/api-reference/client-side-sdks/web#user-module",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `Magic&#39;s official docs`;
    }
  })}</p>
<h2 id="${"custom-styling"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#custom-styling",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Custom Styling</h2>
<p>The Magic Wallet Login styles can customized via ${validate_component(Link, "Link").$$render($$result, {
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `CSS variables`;
    }
  })}. The following properties and their default properties can be customized by adding these variables to the ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: ":root" }, {}, {})} in your CSS file. If they are not specified they will fall back on the style variables prefixed with ${validate_component(CodeInline, "CodeInline").$$render($$result, { code: "--onboard" }, {}, {})} and beyond that to the styles developed by Blocknative:</p>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "css",
    ext: "css",
    linesCount: 30,
    code: '<pre><code><span class="line"><span style="color: #89DDFF">:</span><span style="color: #C792EA">root</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* *if not set will fallback to variables with `--onboard` prefix shown above */</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* CUSTOMIZE THE COLOR  PALLETTE */</span></span>\n<span class="line"><span style="color: #A6ACCD">  --login-modal-white</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> white</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #A6ACCD">  --login-modal-black</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> black</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #A6ACCD">  --login-modal-primary-300</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">b1b8f2</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #A6ACCD">  --login-modal-primary-500</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">6370e5</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #A6ACCD">  --login-modal-gray-200</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">c2c4c9</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #A6ACCD">  --login-modal-gray-500</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">33394b</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #A6ACCD">  --login-modal-danger-500</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">#</span><span style="color: #A6ACCD">ff4f4f</span><span style="color: #89DDFF">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* FONTS */</span></span>\n<span class="line"><span style="color: #A6ACCD">  --login-modal-font-family-normal</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> Sofia Pro</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #A6ACCD">  --login-modal-font-family-light</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> Sofia Pro Light</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #A6ACCD">  --login-modal-font-size-5</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">1rem</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #A6ACCD">  --login-modal-font-line-height-1</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">24px</span><span style="color: #89DDFF">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* SPACING */</span></span>\n<span class="line"><span style="color: #A6ACCD">  --login-modal-margin-4</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">1rem</span><span style="color: #89DDFF">;</span></span>\n<span class="line"><span style="color: #A6ACCD">  --login-modal-margin-5</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0.5rem</span><span style="color: #89DDFF">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #464B5D; font-style: italic">/* MAGIC WALLET MODAL POSITIONING */</span></span>\n<span class="line"><span style="color: #A6ACCD">  --onboard-login-modal-z-index</span></span>\n<span class="line"><span style="color: #A6ACCD">  --onboard-login-modal-top</span></span>\n<span class="line"><span style="color: #A6ACCD">  --onboard-login-modal-bottom</span></span>\n<span class="line"><span style="color: #A6ACCD">  --onboard-login-modal-right</span></span>\n<span class="line"><span style="color: #A6ACCD">  --onboard-login-modal-left</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"></span></code></pre>'
  }, {}, {})}`;
});
export { Magic as default };
