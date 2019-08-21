<script>
  export let icon;
  export let heading;
</script>

<style>
  .bn-modal-header {
    display: flex;
    align-items: center;
    margin-bottom: 0.66rem;
  }

  .bn-modal-header-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.66rem;
    height: 1.66rem;
    padding: 0.66rem;
    border-radius: 30px;
    background-color: #eeeeee;
  }

  .bn-modal-header-icon img {
    height: 100%;
    width: 100%;
  }

  .bn-modal-header-heading {
    color: #4a4a4a;
    font-weight: bold;
    font-size: 1.33rem;
    margin: 0 0 0 1rem;
  }
</style>

<div class="bn-modal-header">
  {#if icon}
    <div class="bn-modal-header-icon">
      <img src={icon} alt="modal icon" />
    </div>
  {/if}
  <h3 class="bn-modal-header-heading">{heading}</h3>
</div>
