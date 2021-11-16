<script context="module">
  import closeIcon from '../../icons/close'
  let scrollContainer

  export function modalAutoScroll(el) {
    const { scrollHeight, clientHeight } = scrollContainer || {}

    if (scrollHeight && scrollHeight > clientHeight) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
</script>

<script>
  import { fade } from 'svelte/transition'

  export let close
</script>

<style>
  section {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 10;
  }

  .background {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
    pointer-events: all;
  }

  .relative {
    position: relative;
  }

  .modal-overflow {
    position: relative;
    overflow: hidden;
    border-radius: 24px;
  }

  .modal {
    position: relative;
    border-radius: 24px;
    overflow-y: auto;
    background: white;
  }

  .close-button {
    position: absolute;
    top: -1.25rem;
    right: -1.25rem;
    cursor: pointer;
    padding: 10.1px;
    z-index: 1;
    background: var(--onboard-white, var(--white));
    border-radius: 40px;
    box-shadow: var(--onboard-shadow-1, var(--shadow-1));
  }

  .close-icon {
    width: 19.8px;
    height: 19.8px;
  }
</style>

<section transition:fade>
  <div class="background">
    <div class="relative">
      <div class="modal-overflow">
        <div class="modal">
          <slot />
        </div>
      </div>
      <div class="close-button" on:click={close}>
        <div class="close-icon">{@html closeIcon}</div>
      </div>
    </div>
  </div>
</section>
