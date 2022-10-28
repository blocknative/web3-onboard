import { c as create_ssr_component, d as spread, g as escape_object, j as subscribe, a as add_attribute, v as validate_component, m as missing_component, e as escape } from "./index-8615df27.js";
import clsx from "clsx";
import { g as getI18nContext } from "./contexts-8ef4e4d1.js";
const Sticky_note_fill = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread([
    { width: "1.2em" },
    { height: "1.2em" },
    { preserveAspectRatio: "xMidYMid meet" },
    { viewBox: "0 0 24 24" },
    escape_object($$props)
  ], {})}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="m15 14l-.117.007a1 1 0 0 0-.876.876L14 15v6H3.998A.996.996 0 0 1 3 20.007V3.993C3 3.445 3.445 3 3.993 3h16.014c.548 0 .993.447.993.999V14h-6zm6 2l-5 4.997V16h5z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Information_fill = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread([
    { width: "1.2em" },
    { height: "1.2em" },
    { preserveAspectRatio: "xMidYMid meet" },
    { viewBox: "0 0 24 24" },
    escape_object($$props)
  ], {})}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Lightbulb_flash_fill = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread([
    { width: "1.2em" },
    { height: "1.2em" },
    { preserveAspectRatio: "xMidYMid meet" },
    { viewBox: "0 0 24 24" },
    escape_object($$props)
  ], {})}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M7.941 18c-.297-1.273-1.637-2.314-2.187-3a8 8 0 1 1 12.49.002c-.55.685-1.888 1.726-2.185 2.998H7.94zM16 20v1a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1h8zm-3-9.995V6l-4.5 6.005H11v4l4.5-6H13z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Error_warning_fill = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread([
    { width: "1.2em" },
    { height: "1.2em" },
    { preserveAspectRatio: "xMidYMid meet" },
    { viewBox: "0 0 24 24" },
    escape_object($$props)
  ], {})}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Skull_2_fill = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread([
    { width: "1.2em" },
    { height: "1.2em" },
    { preserveAspectRatio: "xMidYMid meet" },
    { viewBox: "0 0 24 24" },
    escape_object($$props)
  ], {})}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10v3.764a2 2 0 0 1-1.106 1.789L18 19v1a3 3 0 0 1-2.824 2.995L14.95 23a2.5 2.5 0 0 0 .044-.33L15 22.5V22a2 2 0 0 0-1.85-1.995L13 20h-2a2 2 0 0 0-1.995 1.85L9 22v.5c0 .171.017.339.05.5H9a3 3 0 0 1-3-3v-1l-2.894-1.447A2 2 0 0 1 2 15.763V12C2 6.477 6.477 2 12 2zm-4 9a2 2 0 1 0 0 4a2 2 0 0 0 0-4zm8 0a2 2 0 1 0 0 4a2 2 0 0 0 0-4z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Test_tube_fill = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread([
    { width: "1.2em" },
    { height: "1.2em" },
    { preserveAspectRatio: "xMidYMid meet" },
    { viewBox: "0 0 24 24" },
    escape_object($$props)
  ], {})}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M17 2v2h-1v14c0 2.21-1.79 4-4 4s-4-1.79-4-4V4H7V2h10zm-4 13a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2-3a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm3-8h-4v4h4V4z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Admonition = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let heading;
  let $i18n, $$unsubscribe_i18n;
  let { type } = $$props;
  let { title = null } = $$props;
  const i18n = getI18nContext();
  $$unsubscribe_i18n = subscribe(i18n, (value) => $i18n = value);
  const icons = {
    note: Sticky_note_fill,
    info: Information_fill,
    tip: Lightbulb_flash_fill,
    warning: Error_warning_fill,
    danger: Skull_2_fill,
    experimental: Test_tube_fill
  };
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  heading = title ?? $i18n.admonition[type];
  $$unsubscribe_i18n();
  return `<div${add_attribute("class", clsx("admonition my-8 border-2 border-l-8 p-4 rounded-md mx-auto shadow-xl", type === "note" && "border-pink-400 bg-pink-300/10", type === "info" && "border-blue-400 bg-blue-300/10", type === "tip" && "border-green-400 bg-green-300/10", type === "warning" && "border-yellow-400 bg-yellow-400/10", type === "danger" && "border-red-400 bg-red-300/10", type === "experimental" && "border-indigo-400 bg-indigo-300/10"), 0)}><div${add_attribute("class", clsx("flex h-full items-center font-bold", type === "note" && "text-pink-400", type === "info" && "text-blue-400", type === "tip" && "text-green-400", type === "warning" && "text-yellow-400", type === "danger" && "text-red-400", type === "experimental" && "text-indigo-400"), 0)}>${validate_component(icons[type] || missing_component, "svelte:component").$$render($$result, { class: "mr-1.5 text-xl" }, {}, {})}
    <span class="${"flex items-center"}">${escape(heading)}</span></div>

  <div class="${"pl-1 text-lg text-gray-inverse"}">${slots.default ? slots.default({}) : ``}</div></div>`;
});
export { Admonition as A };
