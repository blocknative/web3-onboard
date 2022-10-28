import { c as create_ssr_component, v as validate_component } from "../../../chunks/index-8615df27.js";
import "clsx";
import { L as Link } from "../../../chunks/Link-6f161fc2.js";
/* empty css                                                              */const Faq = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1>Frequently Asked Questions</h1>
<p>Join our ${validate_component(Link, "Link").$$render($$result, {
    href: "https://discord.com/invite/KZaBVME",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `discord`;
    }
  })} if you want to chat with us in real time.</p>
<ol><li><p>Is web3-onboard open source?</p>
<p>Yes, ${validate_component(Link, "Link").$$render($$result, {
    href: "https://github.com/blocknative/web3-onboard",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `here\u2019s the link to our github`;
    }
  })}</p></li>
<li><p>Is web3-onboard free?</p>
<p>Yes it\u2019s free to use forever.</p></li>
<li><p>Do I need an API key?</p>
<p>No you don\u2019t need an API key to use web3-onboard. The optional addition of an API key allows access to transaction notifications and more frequent gas estimates from Blocknative. You can ${validate_component(Link, "Link").$$render($$result, {
    href: "https://explorer.blocknative.com/account",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `get one here`;
    }
  })}</p></li>
<li><p>Which frameworks does web3-onboard support?</p>
<p>web3-onboard is framework agnostic and is usable with your favorite framework.</p></li>
<li><p>Is web3-onboard customizable?</p>
<p>Yes, we\u2019ve made a theming interface here to show how you can theme web3-onboard for your dapp.</p></li>
<li><p>Are there any code examples?</p>
<p>Yes, we\u2019ve made a connect wallet example available here.</p></li>
<li><p>Does web3-onboard support my favorite network?</p>
<p>web3-onboard is compatible with all EVM networks, which can be specified on initialization. You can add your chain to ${validate_component(Link, "Link").$$render($$result, {
    href: "/docs/overview/introduction#supported-networks"
  }, {}, {
    default: () => {
      return `this list in the docs`;
    }
  })} to call out its support.</p></li></ol>`;
});
export { Faq as default };
