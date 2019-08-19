<script>
  import { fade } from "svelte/transition";
  import closeIcon from "../assets/icons/close.svg";
  export let closeModal;
</script>

<style>
  .bn-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
  }

  .bn-modal-content {
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
    font-family: "Helvetica Neue";
    padding: 1.33rem;
    position: relative;
    overflow: hidden;
  }

  .bn-modal-close {
    height: 0.66rem;
    position: absolute;
    padding: 0.5rem;
    top: 0.5rem;
    right: 0.5rem;
    border-radius: 5px;
    transition: background 200ms ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bn-modal-close:hover {
    cursor: pointer;
    background: #eeeeee;
  }

  .bn-modal-close img {
    width: auto;
    height: 100%;
  }
</style>

<div transition:fade class="bn-modal">
  <section class="bn-modal-content">
    <slot />
    <div class="bn-modal-close" on:click={closeModal}>
      <img src={closeIcon} alt="close" />
    </div>
  </section>
</div>
