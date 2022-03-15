<script lang="ts">
  import infoIcon from '../../icons/info'

  export let size = 20 // px
</script>

<style>
  .icon {
    border-radius: 50px;
    box-sizing: border-box;
    color: var(--onboard-primary-500, var(--primary-500));
  }
</style>

<div class="icon flex" style={`width: ${size}px; height: ${size}px;`}>
  {@html infoIcon}
</div>
