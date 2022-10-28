import { c as create_ssr_component, v as validate_component } from "../../../../chunks/index-8615df27.js";
import "clsx";
import { L as Link } from "../../../../chunks/Link-6f161fc2.js";
/* empty css                                                                 */const U5B_2u5Dcontribution_guide = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h2 id="${"how-can-i-contribute-to-web3-onboard"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#how-can-i-contribute-to-web3-onboard",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} How can I contribute to web3-onboard?</h2>
<h3 id="${"reporting-bugs"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#reporting-bugs",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Reporting Bugs</h3>
<p>Before creating an issue for a bug, please do a search through the Web3 Onboard issues to make sure that one has not already been created. You may find that someone else has run in to that issue and there may be a fix that has been released in a newer update.</p>
<p>If an issue does not exist for the bug that you want to report, go ahead and create an issue, making sure to add as much detail as possible and following the issue template instructions.</p>
<p>Once an issue has been created, one of the Web3 Onboard maintainers will take a look and will respond typically within a few days. The initial response will usually just acknowledge the issue and will indicate what will happen next.</p>
<h3 id="${"pull-requests"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#pull-requests",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Pull Requests</h3>
<p>If there is a feature or change that you would like to see in Web3 Onboard, you can fork the repo and make a pull request to have the changes merged in to the main repo and released as part of the official packages.</p>
<p>Once a PR is created, one of the Web3 Onboard maintainers will acknowledge the PR and add it to our sprint planning to be reviewed as soon as possible.</p>
<h3 id="${"how-can-i-get-a-new-wallet-added"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#how-can-i-get-a-new-wallet-added",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} How can I get a new wallet added?</h3>
<p>Web3 Onboard does not require a wallet to be a part of the main codebase to work, so a wallet module can be created and used for your project without needing anything to happen within the Web3Onboard codebase. If you would like the wallet to be part of the official Web3 Onboard packages and repo, then create a pull request, and make sure to add any documentation updates by creating a docs pull request.</p>
<p>If the wallet you are adding is an \u201Cinjected\u201D wallet (browser extension, mobile dapp browser wallet), you can add a wallet to the injected wallets module. ${validate_component(Link, "Link").$$render($$result, {
    href: "https://github.com/blocknative/web3-onboard/pull/1177/files",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `See here for an example of an injected wallets pull request.`;
    }
  })} You should also add the wallet to the ${validate_component(Link, "Link").$$render($$result, {
    href: "https://onboard.blocknative.com/docs/packages/injected#injected-wallets-supported-natively",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `natively supported injected wallets list`;
    }
  })}.</p>
<p>Otherwise if the wallet you are adding requires adding dependencies and initialization (SDK), then you will need to create a new package in the Web3 Onboard monorepo. ${validate_component(Link, "Link").$$render($$result, {
    href: "https://github.com/blocknative/web3-onboard/pull/1238/files",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `See here for an example of a pull request.`;
    }
  })}</p>
<p>If you cannot write the code yourself to add a new wallet, then go ahead and create a feature request issue which may be considered by the maintainers or someone else in the community.</p>
<h3 id="${"documentation-contributions"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#documentation-contributions",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Documentation contributions</h3>
<p>In order to contribute to the docs, you&#39;ll have to create a PR on the ${validate_component(Link, "Link").$$render($$result, {
    href: "https://github.com/blocknative/web3-onboard/tree/docs-develop",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `docs-develop branch`;
    }
  })}. If you contribute code, you should definitely document it appropriately. We highly encourage the community to improve web3-onboard docs, if you have any questions don&#39;t hesitate to reach out.</p>
<h2 id="${"feedback"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#feedback",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Feedback</h2>
<p>Jump in to our discord server to provide any feedback you feel is worth sharing. Could the docs be improved? Did you have trouble integrating? Feature requests etc.</p>
<h2 id="${"support"}" tabindex="${"-1"}">${validate_component(Link, "Link").$$render($$result, {
    class: "header-anchor",
    href: "#support",
    "aria-hidden": "true"
  }, {}, {
    default: () => {
      return `#`;
    }
  })} Support</h2>
<p>For general questions about how to use Web3 Onboard you can first check out our ${validate_component(Link, "Link").$$render($$result, {
    href: "https://onboard.blocknative.com/docs/overview/introduction#features",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `docs`;
    }
  })} to see if there is an answer there, or you can head to our ${validate_component(Link, "Link").$$render($$result, {
    href: "https://discord.com/invite/KZaBVME",
    target: "_blank",
    rel: "noopener noreferrer"
  }, {}, {
    default: () => {
      return `Discord`;
    }
  })} for support from the Blocknative team</p>`;
});
export { U5B_2u5Dcontribution_guide as default };
