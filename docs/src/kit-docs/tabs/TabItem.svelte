<script>
  import { toTitleCase } from './utils'

  import { useTabsRegistry } from './tabsRegistry'

  /** @type {string} */
  export let value
  /** @type {string} */
  export let label = value ? toTitleCase(value) : 'Unknown'

  const { addTab, selectTab, currentValue } = useTabsRegistry()

  addTab({ value, label })

  $: selected = $currentValue === value

  function onSelect() {
    selectTab(value)
  }
</script>

<li
  class="tab hover:text-gray-inverse"
  role="tab"
  aria-selected={selected ? 'true' : 'false'}
  tabindex="0"
  class:selected
  on:pointerdown={onSelect}
  on:keydown={(e) => e.key === 'Enter' && onSelect()}
>
  <slot>
    {label}
  </slot>
</li>

<style>
  .tab[role='tab'] {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0.75rem 1.25rem;
    cursor: pointer;
    border-radius: 0 !important;
    border-bottom: 0.25rem solid transparent;
    font-weight: bold;
  }

  .tab.selected {
    color: var(--kd-color-brand);
    border-color: currentColor;
  }
</style>
