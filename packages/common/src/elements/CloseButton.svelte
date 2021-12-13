<script>
  import closeIcon from '../icons/close'
</script>

<style>
  .close-button {
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4rem;
    background: var(--onboard-gray-100, var(--gray-100));
    border-radius: 40px;
    color: var(--onboard-black, var(--black));
  }

  .close-icon {
    height: 100%;
  }
</style>

<div class="close-button">
  <div class="close-icon">{@html closeIcon}</div>
</div>
