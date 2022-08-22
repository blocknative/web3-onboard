<script lang="ts">
  import { setContext, onDestroy, onMount } from 'svelte'
  import TabItem from './TabItem.svelte'
  import { createTabsRegistry, TABS_REGISTRY_CTX_KEY } from './tabsRegistry'
  import { isString } from './utils'

  /** @type {(import('./tabsRegistry').TabsRegistryItem)[]} */
  export let values: any[] = []
  /** @type {string | null} */
  export let defaultValue = null
  /** @type {string | null} */
  export let groupId = null

  const registry = createTabsRegistry([...values], {
    defaultValue,
    groupId,
    onMount,
    onDestroy
  })

  setContext(TABS_REGISTRY_CTX_KEY, registry)
</script>

<div class="tabs w-full border border-[var(--kd-color-gray-divider)] rounded-md">
  <ul
    class="flex items-center w-full list-none m-0 overflow-x-auto border-b border-gray-200"
    role="tablist"
    aria-orientation="horizontal"
  >
    {#each values.filter(isString) as value (value)}
      <TabItem {value} />
    {/each}

    <slot name="tablist" />
  </ul>

  <div class="p-5">
    <slot />
  </div>
</div>
