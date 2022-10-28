import { t as getContext, c as create_ssr_component, j as subscribe, a as add_attribute, e as escape, s as setContext, k as each, o as onDestroy, v as validate_component } from "./index-8615df27.js";
import { o as onMount } from "./ssr-eca022de.js";
import { w as writable } from "./contexts-8ef4e4d1.js";
/* empty css                                                */const wordSeparators = /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/;
function toTitleCase(str) {
  const words = str.split(wordSeparators);
  const len = words.length;
  const mappedWords = new Array(len);
  for (let i = 0; i < len; i++) {
    const word = words[i];
    if (word === "") {
      continue;
    }
    mappedWords[i] = word[0].toUpperCase() + word.slice(1);
  }
  return mappedWords.join(" ");
}
function isString(value) {
  return (value == null ? void 0 : value.constructor) === String;
}
const TABS_REGISTRY_CTX_KEY = Symbol("");
function useTabsRegistry() {
  return getContext(TABS_REGISTRY_CTX_KEY);
}
const groups = {};
const getGroupStorageKey = (id) => `@vitebook/tabs/group::${id}`;
function createTabsRegistry(values, { defaultValue, groupId, onMount: onMount2, onDestroy: onDestroy2 }) {
  let currentValue = writable(null);
  const initialValue = () => {
    const item = defaultValue ?? values[0];
    return isString(item) ? item : item == null ? void 0 : item.value;
  };
  if (groupId) {
    const storageKey = getGroupStorageKey(groupId);
    const groupStore = groups[groupId] ?? (groups[groupId] = writable(null));
    currentValue = groupStore;
    let hasInit = false;
    onMount2(() => {
      if (hasInit)
        return;
      hasInit = true;
      currentValue.set(window.localStorage.getItem(storageKey) ?? initialValue());
      return currentValue.subscribe((value) => {
        window.localStorage.setItem(storageKey, value ?? "");
      });
    });
  } else {
    onMount2(() => {
      currentValue.set(initialValue());
    });
  }
  const registry = {
    currentValue,
    addTab: (item) => {
      if (registry.hasTab(item))
        return;
      const value = isString(item) ? item : item.value;
      values.push(value);
      onDestroy2(() => {
        registry.removeTab(item);
      });
    },
    selectTab: (item) => {
      currentValue.set(isString(item) ? item : item.value);
    },
    hasTab: (item) => {
      return registry.indexOf(item) >= 0;
    },
    indexOf: (item) => {
      return isString(item) ? values.indexOf(item) : values.findIndex((v) => v === item.value);
    },
    getValue: (item) => {
      return isString(item) ? item : item == null ? void 0 : item.value;
    },
    removeTab: (item) => {
      const i = registry.indexOf(item);
      if (i >= 0) {
        values.splice(i, 1);
        currentValue.update((current) => current === item ? registry.getValue(values[i]) ?? registry.getValue(values[values.length - 1]) : current);
      }
    }
  };
  return registry;
}
const css = {
  code: ".tab[role='tab'].svelte-n8rdaz{display:flex;align-items:center;justify-content:center;margin:0;padding:0.75rem 1.25rem;cursor:pointer;border-radius:0 !important;border-bottom:0.25rem solid transparent;font-weight:bold}.tab.selected.svelte-n8rdaz{color:var(--kd-color-brand);border-color:currentColor}",
  map: null
};
const TabItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selected;
  let $currentValue, $$unsubscribe_currentValue;
  let { value } = $$props;
  let { label = value ? toTitleCase(value) : "Unknown" } = $$props;
  const { addTab, selectTab, currentValue } = useTabsRegistry();
  $$unsubscribe_currentValue = subscribe(currentValue, (value2) => $currentValue = value2);
  addTab({ value, label });
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  $$result.css.add(css);
  selected = $currentValue === value;
  $$unsubscribe_currentValue();
  return `<li class="${["tab hover:text-gray-inverse svelte-n8rdaz", selected ? "selected" : ""].join(" ").trim()}" role="${"tab"}"${add_attribute("aria-selected", selected ? "true" : "false", 0)} tabindex="${"0"}">${slots.default ? slots.default({}) : `
    ${escape(label)}
  `}
</li>`;
});
const TabPanel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selected;
  let $currentValue, $$unsubscribe_currentValue;
  let { value } = $$props;
  const { currentValue } = useTabsRegistry();
  $$unsubscribe_currentValue = subscribe(currentValue, (value2) => $currentValue = value2);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  selected = $currentValue === value;
  $$unsubscribe_currentValue();
  return `<div role="${"tabpanel"}" ${!selected ? "hidden" : ""}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Tabs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { values = [] } = $$props;
  let { defaultValue = null } = $$props;
  let { groupId = null } = $$props;
  const registry = createTabsRegistry([...values], {
    defaultValue,
    groupId,
    onMount,
    onDestroy
  });
  setContext(TABS_REGISTRY_CTX_KEY, registry);
  if ($$props.values === void 0 && $$bindings.values && values !== void 0)
    $$bindings.values(values);
  if ($$props.defaultValue === void 0 && $$bindings.defaultValue && defaultValue !== void 0)
    $$bindings.defaultValue(defaultValue);
  if ($$props.groupId === void 0 && $$bindings.groupId && groupId !== void 0)
    $$bindings.groupId(groupId);
  return `<div class="${"tabs w-full"}"><ul class="${"flex items-center w-full list-none m-0 p-0 overflow-x-auto border-b border-gray-divider"}" role="${"tablist"}" aria-orientation="${"horizontal"}">${each(values.filter(isString), (value) => {
    return `${validate_component(TabItem, "TabItem").$$render($$result, { value }, {}, {})}`;
  })}

    ${slots.tablist ? slots.tablist({}) : ``}</ul>

  <div>${slots.default ? slots.default({}) : ``}</div></div>`;
});
export { Tabs as T, TabPanel as a };
