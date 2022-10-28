import { c as create_ssr_component, a as add_attribute, v as validate_component, e as escape } from "../../chunks/index-8615df27.js";
import { K as KitDocs, a as KitDocsLayout, S as SocialLink, B as Blocknative } from "../../chunks/blocknative-25834683.js";
import "clsx";
import "../../chunks/twitter-fill-08c56211.js";
import "../../chunks/contexts-8ef4e4d1.js";
import "../../chunks/kitDocs-4c2b738a.js";
const OpenGraph = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { image } = $$props;
  let { metadescription: metadescription2 } = $$props;
  let { pageTitle } = $$props;
  let { url: url2 } = $$props;
  let { siteTitle } = $$props;
  let { ogLanguage } = $$props;
  if ($$props.image === void 0 && $$bindings.image && image !== void 0)
    $$bindings.image(image);
  if ($$props.metadescription === void 0 && $$bindings.metadescription && metadescription2 !== void 0)
    $$bindings.metadescription(metadescription2);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0)
    $$bindings.pageTitle(pageTitle);
  if ($$props.url === void 0 && $$bindings.url && url2 !== void 0)
    $$bindings.url(url2);
  if ($$props.siteTitle === void 0 && $$bindings.siteTitle && siteTitle !== void 0)
    $$bindings.siteTitle(siteTitle);
  if ($$props.ogLanguage === void 0 && $$bindings.ogLanguage && ogLanguage !== void 0)
    $$bindings.ogLanguage(ogLanguage);
  return `${$$result.head += `<meta property="${"og:site_name"}"${add_attribute("content", siteTitle, 0)} data-svelte="svelte-dx4xbh"><meta property="${"og:locale"}"${add_attribute("content", ogLanguage, 0)} data-svelte="svelte-dx4xbh"><meta property="${"og:url"}"${add_attribute("content", url2, 0)} data-svelte="svelte-dx4xbh"><meta property="${"og:type"}" content="${"website"}" data-svelte="svelte-dx4xbh"><meta property="${"og:title"}"${add_attribute("content", pageTitle, 0)} data-svelte="svelte-dx4xbh"><meta property="${"og:description"}"${add_attribute("content", metadescription2, 0)} data-svelte="svelte-dx4xbh">${image ? `<meta property="${"og:image"}"${add_attribute("content", image.url, 0)} data-svelte="svelte-dx4xbh">
    <meta property="${"og:image:alt"}"${add_attribute("content", image.alt, 0)} data-svelte="svelte-dx4xbh">` : ``}`, ""}`;
});
const Twitter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { image } = $$props;
  let { metadescription: metadescription2 } = $$props;
  let { pageTitle } = $$props;
  let { url: url2 } = $$props;
  if ($$props.image === void 0 && $$bindings.image && image !== void 0)
    $$bindings.image(image);
  if ($$props.metadescription === void 0 && $$bindings.metadescription && metadescription2 !== void 0)
    $$bindings.metadescription(metadescription2);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0)
    $$bindings.pageTitle(pageTitle);
  if ($$props.url === void 0 && $$bindings.url && url2 !== void 0)
    $$bindings.url(url2);
  return `${$$result.head += `<meta property="${"twitter:card"}" content="${"summary_large_image"}" data-svelte="svelte-19j40fq"><meta property="${"twitter:title"}"${add_attribute("content", pageTitle, 0)} data-svelte="svelte-19j40fq"><meta property="${"twitter:description"}"${add_attribute("content", metadescription2, 0)} data-svelte="svelte-19j40fq"><meta property="${"twitter:url"}"${add_attribute("content", url2, 0)} data-svelte="svelte-19j40fq">${image ? `<meta name="${"twitter:image"}"${add_attribute("content", image.url, 0)} data-svelte="svelte-19j40fq">
    <meta name="${"twitter:image:alt"}"${add_attribute("content", image.alt, 0)} data-svelte="svelte-19j40fq">` : ``}`, ""}`;
});
var MetaImage = "/_app/immutable/assets/blocknative-onboard-og-image-f5a685a3.png";
const SEO = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { metadescription: metadescription2 } = $$props;
  let { title: title2 } = $$props;
  let { url: url2 } = $$props;
  let { image = {
    url: MetaImage,
    alt: "Web3-Onboard Connect Wallet Button"
  } } = $$props;
  const twitterProps = {
    image,
    metadescription: metadescription2,
    pageTitle: title2,
    url: url2
  };
  const openGraphProps = {
    siteTitle: title2,
    ogLanguage: "en_us",
    image,
    metadescription: metadescription2,
    pageTitle: title2,
    url: url2
  };
  if ($$props.metadescription === void 0 && $$bindings.metadescription && metadescription2 !== void 0)
    $$bindings.metadescription(metadescription2);
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.url === void 0 && $$bindings.url && url2 !== void 0)
    $$bindings.url(url2);
  if ($$props.image === void 0 && $$bindings.image && image !== void 0)
    $$bindings.image(image);
  return `${validate_component(Twitter, "Twitter").$$render($$result, Object.assign(twitterProps), {}, {})}
${validate_component(OpenGraph, "OpenGraph").$$render($$result, Object.assign(openGraphProps), {}, {})}`;
});
var __layoutHomepage_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ":root{--kd-color-brand-rgb:99, 112, 229}")();
const css = {
  code: ":root{--kd-color-brand-rgb:99, 112, 229}",
  map: null
};
const prerender = true;
const title = "Web3-Onboard | The easy way to connect web3 users to dapps";
const metadescription = "Open-source, framework-agnostic JavaScript library to onboard users to web3 apps. Help your users transact with ease by enabling wallet connection, real-time transaction states, and more.";
const url = "https://onboard.blocknative.com/";
const _layout_homepage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const navbar = {
    links: [
      {
        title: "Documentation",
        slug: "/docs",
        match: /\/docs/
      },
      {
        title: "Examples",
        slug: "/examples",
        match: /\/examples/
      },
      {
        title: "FAQ",
        slug: "/faq",
        match: /\/faq/
      },
      {
        title: "Blog",
        slug: "https://www.blocknative.com/blog/tag/web3-onboard"
      }
    ]
  };
  $$result.css.add(css);
  return `${$$result.head += `${`${$$result.title = `<title>${escape(title)}</title>`, ""}`}${`<meta name="${"description"}"${add_attribute("content", metadescription, 0)} data-svelte="svelte-1nm3ek9">`}`, ""}

${validate_component(SEO, "SEO").$$render($$result, { title, metadescription, url }, {}, {})}

${validate_component(KitDocs, "KitDocs").$$render($$result, {}, {}, {
    default: () => {
      return `<div style="display: contents; --kd-content-max-width:${escape("100%")};">${validate_component(KitDocsLayout, "KitDocsLayout").$$render($$result, { navbar, search: true }, {}, {
        "navbar-right-alt": () => {
          return `<div slot="${"navbar-right-alt"}"><div class="${"flex"}">${validate_component(SocialLink, "SocialLink").$$render($$result, {
            type: "gitHub",
            href: "//github.com/blocknative/web3-onboard"
          }, {}, {})}
        ${validate_component(SocialLink, "SocialLink").$$render($$result, {
            type: "discord",
            href: "//discord.com/invite/KZaBVME"
          }, {}, {})}</div></div>`;
        },
        "navbar-left": () => {
          return `<div slot="${"navbar-left"}"><a href="${"/"}">${validate_component(Blocknative, "IconBN").$$render($$result, {}, {}, {})}</a></div>`;
        },
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}</div>`;
    }
  })}`;
});
export { _layout_homepage as default, prerender };
