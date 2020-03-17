<script lang="ts">
  import { fade } from 'svelte/transition'
  import { app } from '../stores'
  export let closeModal: () => void
  export let closeable: boolean = true

  let closeHovered: boolean
</script>

<style>
  /* === TARGET BY ELEMENT TO ALLOW CUSTOM OVERRIDES TO HAVE ADEQUATE SPECIFICITY ===*/
  /* .bn-onboard-modal */
  aside {
    display: flex;
    font-family: 'Helvetica Neue';
    justify-content: center;
    align-items: center;
    position: fixed;
    font-size: 16px;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
  }

  @media screen and (max-width: 420px) {
    aside {
      font-size: 14px;
    }
  }

  /* .bn-onboard-modal-content  */
  section {
    display: block;
    box-sizing: content-box;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
    font-family: inherit;
    font-size: inherit;
    padding: 1.33em;
    position: relative;
    overflow: hidden;
    max-width: 37em;
    color: #4a4a4a;
  }

  /* .bn-onboard-modal-content-close  */
  div {
    height: 0.66em;
    position: absolute;
    padding: 0.8em;
    top: 1.33em;
    right: 1.33em;
    font-size: inherit;
    font-family: inherit;
    border-radius: 5px;
    transition: background 200ms ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* .bn-onboard-modal-content-close:hover  */
  div:hover {
    cursor: pointer;
    background: #eeeeee;
  }

  /* .bn-onboard-modal-content-close  */
  svg {
    width: 10px;
    height: 10px;
  }

  .bn-onboard-dark-mode-close-background:hover {
    background: #00222c;
  }
</style>

<aside transition:fade class="bn-onboard-custom bn-onboard-modal">
  <section
    class:bn-onboard-dark-mode={$app.darkMode}
    class="bn-onboard-custom bn-onboard-modal-content">
    <slot />
    {#if closeable}
      <div
        class="bn-onboard-custom bn-onboard-modal-content-close"
        class:bn-onboard-dark-mode-close-background={$app.darkMode}
        on:click={closeModal}
        on:mouseenter={() => (closeHovered = true)}
        on:mouseleave={() => (closeHovered = false)}>
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 47.971 47.971"
          style="enable-background:new 0 0 47.971 47.971; transition: fill 150ms
          ease-in-out;"
          fill={closeHovered ? ($app.darkMode ? '#ffffff' : '#4a4a4a') : '#9B9B9B'}
          xml:space="preserve">
          <g>
            <path
              d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
              c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
              C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
              s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z" />
          </g>
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
        </svg>
      </div>
    {/if}
  </section>
</aside>
