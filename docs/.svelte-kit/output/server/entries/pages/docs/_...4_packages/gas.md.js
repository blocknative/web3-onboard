import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index-8615df27.js";
import { C as CodeFence } from "../../../../chunks/CodeFence-7825ab22.js";
import "clsx";
import { L as Link } from "../../../../chunks/Link-6f161fc2.js";
/* empty css                                                                 */import { T as Tabs, a as TabPanel } from "../../../../chunks/Tabs-dd4460a7.js";
import "../../../../chunks/contexts-8ef4e4d1.js";
import "../../../../chunks/ssr-eca022de.js";
const Gas = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1>@web3-onboard/gas</h1>
<p>A module for requesting streams or single requests of gas price estimates from the ${validate_component(Link, "Link").$$render($$result, {
    href: "https://docs.blocknative.com/gas-platform",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `Blocknative Gas Platform API`;
    }
  })}.</p>
<h3 id="${"install"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#install",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Install</h3>
${validate_component(Tabs, "Tabs").$$render($$result, { values: ["yarn", "npm"] }, {}, {
    default: () => {
      return `${validate_component(TabPanel, "TabPanel").$$render($$result, { value: "yarn" }, {}, {
        default: () => {
          return `${validate_component(CodeFence, "CodeFence").$$render($$result, {
            lang: "bash",
            ext: "sh",
            linesCount: 2,
            rawCode: "yarn add @web3-onboard/gas\n",
            showCopyCode: true,
            code: '<pre><code><span class="line"><span style="color: #A6ACCD">yarn add @web3-onboard/gas</span></span>\n<span class="line"></span></code></pre>'
          }, {}, {})}`;
        }
      })}
  ${validate_component(TabPanel, "TabPanel").$$render($$result, { value: "npm" }, {}, {
        default: () => {
          return `${validate_component(CodeFence, "CodeFence").$$render($$result, {
            lang: "bash",
            ext: "sh",
            linesCount: 2,
            rawCode: "npm install @web3-onboard/gas\n",
            showCopyCode: true,
            code: '<pre><code><span class="line"><span style="color: #A6ACCD">npm install @web3-onboard/gas</span></span>\n<span class="line"></span></code></pre>'
          }, {}, {})}`;
        }
      })}`;
    }
  })}
<h3 id="${"standalone-usage"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#standalone-usage",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Standalone Usage</h3>
${validate_component(CodeFence, "CodeFence").$$render($$result, {
    lang: "typescript",
    ext: "ts",
    linesCount: 38,
    code: '<pre><code><span class="line"><span style="color: #89DDFF; font-style: italic">import</span><span style="color: #A6ACCD"> gas </span><span style="color: #89DDFF; font-style: italic">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@web3-onboard/gas</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #464B5D; font-style: italic">// subscribe to a single chain for estimates using the default poll rate of 5 secs</span></span>\n<span class="line"><span style="color: #464B5D; font-style: italic">// API key is optional and if provided allows for faster poll rates</span></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> ethMainnetGasBlockPrices </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> gas</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">stream</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">chains</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0x1</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">apiKey</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">&lt;OPTIONAL_API_KEY&gt;</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">endpoint</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">blockPrices</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">unsubscribe</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> ethGasUnsub </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> ethMainnetGasBlockPrices</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">subscribe</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">(</span><span style="color: #A6ACCD">estimates</span><span style="color: #89DDFF">)</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">=&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  console</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">log</span><span style="color: #A6ACCD">(estimates)</span></span>\n<span class="line"><span style="color: #A6ACCD">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #464B5D; font-style: italic">// .... sometime later, unsubscribe to stop polling</span></span>\n<span class="line"><span style="color: #82AAFF">setTimeout</span><span style="color: #A6ACCD">(ethGasUnsub</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">10000</span><span style="color: #A6ACCD">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #464B5D; font-style: italic">// OR you can subscribe to multiple chains at once:</span></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> gasBlockPrices </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> gas</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">stream</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">chains</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0x1</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0x89</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">apiKey</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">&lt;OPTIONAL_API_KEY&gt;</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">endpoint</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">blockPrices</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #89DDFF">  </span><span style="color: #464B5D; font-style: italic">// can override default poll rate as well</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">poll</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">1000</span></span>\n<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> unsubscribe </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> gasBlockPrices</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">subscribe</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">(</span><span style="color: #A6ACCD">estimates</span><span style="color: #89DDFF">)</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #A6ACCD"> console</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">log</span><span style="color: #A6ACCD">(estimates))</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #464B5D; font-style: italic">// .... sometime later, unsubscribe to stop polling</span></span>\n<span class="line"><span style="color: #82AAFF">setTimeout</span><span style="color: #A6ACCD">(unsubscribe</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">10000</span><span style="color: #A6ACCD">)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #464B5D; font-style: italic">// Can also just do a one time get rather than a stream</span></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> gasBlockPrices </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF; font-style: italic">await</span><span style="color: #A6ACCD"> gas</span><span style="color: #89DDFF">.</span><span style="color: #82AAFF">get</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">chains</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0x1</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">0x89</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">apiKey</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">&lt;OPTIONAL_API_KEY&gt;</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">endpoint</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">blockPrices</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">)</span></span>\n<span class="line"></span></code></pre>'
  }, {}, {})}`;
});
export { Gas as default };
