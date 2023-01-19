import { getContext } from 'svelte'
import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'

import { isString } from './utils'

export const TABS_REGISTRY_CTX_KEY = Symbol(import.meta.env.DEV ? 'TABS_REGISTRY' : '')

export type TabsRegistryItem = string | { value: string; label: string }

export type TabsRegistry = {
  currentValue: Writable<string | null>
  addTab: (item: TabsRegistryItem) => void
  selectTab: (item: TabsRegistryItem) => void
  getValue: (item: TabsRegistryItem) => string
  hasTab: (item: TabsRegistryItem) => boolean
  indexOf: (item: TabsRegistryItem) => number
  removeTab: (item: TabsRegistryItem) => void
}

export type TabsRegistryOptions = {
  defaultValue?: string | null
  groupId?: string | null
  onMount: (callback: () => void) => void
  onDestroy: (callback: () => void) => void
}

export function useTabsRegistry(): TabsRegistry {
  return getContext(TABS_REGISTRY_CTX_KEY)
}

const groups: { [id: string]: Writable<string | null> } = {}

const getGroupStorageKey = (id: string) => `@vitebook/tabs/group::${id}`

export function createTabsRegistry(
  values: TabsRegistryItem[],
  { defaultValue, groupId, onMount, onDestroy }: TabsRegistryOptions
): TabsRegistry {
  let currentValue = writable<string | null>(null)

  const initialValue = () => {
    const item = defaultValue ?? values[0]
    return isString(item) ? item : item?.value
  }

  if (groupId) {
    const storageKey = getGroupStorageKey(groupId)
    const groupStore = (groups[groupId] ??= writable(null))

    currentValue = groupStore

    // Avoid SSR mismatch.
    let hasInit = false
    onMount(() => {
      if (hasInit) return
      hasInit = true

      currentValue.set(window.localStorage.getItem(storageKey) ?? initialValue())

      return currentValue.subscribe((value) => {
        window.localStorage.setItem(storageKey, value ?? '')
      })
    })
  } else {
    onMount(() => {
      currentValue.set(initialValue())
    })
  }

  const registry: TabsRegistry = {
    currentValue,
    addTab: (item) => {
      if (registry.hasTab(item)) return
      const value = isString(item) ? item : item.value
      values.push(value)
      onDestroy(() => {
        registry.removeTab(item)
      })
    },
    selectTab: (item) => {
      currentValue.set(isString(item) ? item : item.value)
    },
    hasTab: (item) => {
      return registry.indexOf(item) >= 0
    },
    indexOf: (item) => {
      return isString(item) ? values.indexOf(item) : values.findIndex((v) => v === item.value)
    },
    getValue: (item) => {
      return isString(item) ? item : item?.value
    },
    removeTab: (item) => {
      const i = registry.indexOf(item)
      if (i >= 0) {
        values.splice(i, 1)
        currentValue.update((current) =>
          current === item
            ? registry.getValue(values[i]) ?? registry.getValue(values[values.length - 1])
            : current
        )
      }
    }
  }

  return registry
}
