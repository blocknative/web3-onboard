<script context="module">
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
</style>

<section transition:fade>
  <div on:click={close} class="background">
    <div on:click|stopPropagation class="relative">
      <div class="modal-overflow">
        <div class="modal">
          <slot />
        </div>
      </div>
    </div>
  </div>
</section>
