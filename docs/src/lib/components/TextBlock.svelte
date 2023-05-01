<script>
  export let title = 'Title'
  export let subtitle = 'Subtitle'
  export let text = 'Body Text'
</script>

<div class="textblock">
  <div class="title">{title}</div>
  <div class="subtitle">{subtitle}</div>
  <div class="text">{text}</div>
  <slot />
</div>

<style>
  .textblock {
    display: flex;
    flex-flow: column;
    flex: 0 1 auto;
    gap: 1rem;
    max-width: 524px;
  }

  .title {
    font-family: 'Sofia Pro';
    font-style: normal;
    font-weight: 900;
    font-size: 32px;
    line-height: 32px;
  }

  .subtitle,
  .text {
    /* F4 */
    font-family: 'Sofia Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 32px;
  }
</style>
