<script lang="ts" context="module">
  let scrollContainer: HTMLElement

  export function modalAutoScroll(el: HTMLElement): void {
    const { scrollHeight, clientHeight } = scrollContainer || {}

    if (scrollHeight && scrollHeight > clientHeight) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
</script>

<script lang="ts">
  import { fade } from 'svelte/transition'

  export let close: () => void
</script>

<style>
  section {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: var(--onboard-modal-z-index, var(--modal-z-index));
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
    display: flex;
    max-height: calc(100vh - 2rem);
  }

  .modal-overflow {
    position: relative;
    overflow: hidden;
    border-radius: 24px;
    display: flex;
    justify-content: center;
  }

  .modal {
    position: relative;
    border-radius: 24px;
    overflow-y: auto;
    background: white;
  }

  @media all and (max-width: 520px) {
    .relative {
      width: calc(100% - 1rem);
    }

    .modal-overflow {
      width: 100%;
    }

    .modal {
      width: 100%;
    }
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
