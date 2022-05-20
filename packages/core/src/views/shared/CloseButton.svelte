<script>
  import closeIcon from '../../icons/close'

  export let width = '24px'
</script>

<style>
  .close-button {
    padding: 0.25rem;
    background: var(
      --onboard-close-button-background,
      var(--onboard-gray-100, var(--gray-100))
    );
    border-radius: 40px;
    color: var(
      --onboard-close-button-color,
      var(--onboard-gray-600, var(--gray-600))
    );
  }

</style>

<div class="flex justify-center items-center pointer">
  <div class="close-button flex justify-center items-center">
    <div class="flex items-center" style="width:{width};">
      {@html closeIcon}
    </div>
  </div>
</div>
