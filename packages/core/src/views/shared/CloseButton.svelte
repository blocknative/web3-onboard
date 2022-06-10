<script>
  import closeIcon from '../../icons/close-circle'

  export let width = '24px'
  export let backgroundColor = `var(
      --onboard-close-button-background,
      var(--onboard-gray-100, var(--gray-100))
    );`
</script>

<style>
  .close-button {
    padding: 0.25rem;
    border-radius: 40px;
    color: var(
      --onboard-close-button-color,
      var(--onboard-gray-600, var(--gray-600))
    );
  }
</style>

<div class="flex justify-center items-center pointer">
  <div
    class="close-button flex justify-center items-center"
    style={`background:${backgroundColor}`}
  >
    <div class="flex items-center" style="width:{width};">
      {@html closeIcon}
    </div>
  </div>
</div>
