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
  import { onDestroy, onMount } from 'svelte'

  const html = document.documentElement
  onMount(() => {
    html.style.position = 'sticky'
    html.style.overflow = 'hidden'
  })

  onDestroy(() => {
    html.style.position = ''
    html.style.removeProperty('overflow')
  })
  export let close: () => void
</script>

<style>
  section {
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: var(--onboard-modal-z-index, var(--modal-z-index));
  }

  .background {
    width: 100vw;
    height: 100vh;
    background: var(--onboard-modal-backdrop, var(--modal-backdrop));
    pointer-events: all;
  }

  .max-height {
    max-height: calc(100vh - 2rem);
  }

  .modal-position {
    top: var(--onboard-modal-top, var(--modal-top));
    bottom: var(--onboard-modal-bottom, var(--modal-bottom));
    left: var(--onboard-modal-left, var(--modal-left));
    right: var(--onboard-modal-right, var(--modal-right));
  }

  .modal-overflow {
    overflow: hidden;
  }

  .modal-styling {
    border-radius: var(--onboard-modal-border-radius, var(--border-radius-1))
      var(--onboard-modal-border-radius, var(--border-radius-1)) 0 0;
    box-shadow: var(--onboard-modal-box-shadow, var(--box-shadow-0));
  }

  .modal {
    overflow-y: auto;
    background: var(--onboard-modal-background, white);
    color: var(--onboard-modal-color, initial);
    max-width: 100vw;
  }

  .modal-container-mobile {
    bottom: 0;
  }

  @media all and (min-width: 768px) {
    .modal-styling {
      border-radius: var(--onboard-modal-border-radius, var(--border-radius-1));
    }
    .modal-container-mobile {
      bottom: unset;
      margin: 1rem;
    }
  }
</style>

<section class="fixed" transition:fade>
  <div
    on:click={close}
    class="background flex items-center justify-center relative"
  >
    <div class="modal-container-mobile modal-position flex absolute">
      <div on:click|stopPropagation class="flex relative max-height">
        <div class="modal-overflow modal-styling relative flex justify-center">
          <div class="modal relative">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
