<script>
  import closeIcon from '../icons/close'
</script>

<style>
  .close-button-container {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .close-button {
    width: 2rem;
    height: 2rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4rem;
    border-radius: 40px;
    color: var(--onboard-black, var(--black));
    background: var(--onboard-white, var(--white));
  }
  .close-icon {
    width: 14px;
    display: flex;
    align-items: center;
  }
</style>

<div class="close-button-container">
  <div class="close-button">
    <div class="close-icon">{@html closeIcon}</div>
  </div>
</div>
