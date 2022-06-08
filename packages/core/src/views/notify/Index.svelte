<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { flip } from 'svelte/animate'
  import { state } from '../../store'
  import { startWith } from 'rxjs'
  import Notification from './Notification.svelte'

  export let position: string

  const notifications$ = state.select('notifications').pipe(startWith([]))
</script>

<style>
  ul {
    padding-left: 0;
    display: flex;
    flex-flow: column nowrap;
    font-size: 16px;
    list-style-type: none;
    width: 316px;
    max-height: 100vh;
    overflow-y: scroll;
    color: #4a4a4a;
    background: transparent;
    scrollbar-width: none;
    box-sizing: border-box;
    pointer-events: none;
    z-index: 300;
    font-family: var(
      --notify-onboard-font-family-normal,
      var(--onboard-font-family-normal, var(--font-family-normal))
    );
    margin: 0 0;
  }
  
  @media only screen and (max-width: 450px) {
    ul {
      width: 100%;
    }
  }

  :global(.bn-notify-clickable:hover) {
    cursor: pointer;
  }

  ::-webkit-scrollbar {
    display: none;
  }
</style>

{#if $notifications$.length}
  <ul
    class="bn-notify-custom bn-notify-notify"
    style={`justify-content:${
      position.includes('top') ? 'flex-start' : 'flex-end'
    };`}
  >
    {#each $notifications$ as notification (notification.key)}
      <li animate:flip={{ duration: 500 }}     
        style={`margin:${
        position.includes('top') ? '8px 0 0' : '0 0 8px'
      };`}>
        <Notification {position} {notification} />
      </li>
    {/each}
  </ul>
{/if}
