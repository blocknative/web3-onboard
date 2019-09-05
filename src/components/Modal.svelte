<script>
  import { fade } from "svelte/transition";
  import closeIcon from "../assets/icons/close.svg";
  import { configuration } from "../stores";
  export let closeModal;
</script>

<style>
  /* === TARGET BY ELEMENT TO ALLOW CUSTOM OVERRIDES TO HAVE ADEQUATE SPECIFICITY ===*/

  /* .bn-onboard-modal */
  aside {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
  }

  /* .bn-onboard-modal-content  */
  section {
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
    font-family: "Helvetica Neue";
    padding: 1.33rem;
    position: relative;
    overflow: hidden;
    max-width: 36rem;
    color: #4a4a4a;
  }

  /* .bn-onboard-modal-content-close  */
  div {
    height: 0.66rem;
    position: absolute;
    padding: .8rem;
    top: 1.33rem;
    right: 1.33rem;
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
  img {
    width: 10px;
    height: 10px;
  }
</style>

<aside transition:fade class="bn-onboard-custom bn-onboard-modal">
  <section
    class:bn-onboard-dark-mode={$configuration.darkMode}
    class="bn-onboard-custom bn-onboard-modal-content">
    <slot />
    <div
      class="bn-onboard-custom bn-onboard-modal-content-close"
      on:click={closeModal}>
      <img src={closeIcon} alt="close" />
    </div>
  </section>
</aside>
