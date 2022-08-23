<script>
  import ArrowRightLine from '~icons/ri/arrow-right-line';

  export let label = ''
  export let href = '#!'
  export let buttonStyle = 'button'

  let iconSize = '24px';
</script>

{#if buttonStyle === 'link'}
  <a href={href} class="link-style" style={$$props.style}>
    <slot>{label}</slot>
    <ArrowRightLine width={iconSize} height={iconSize}/>
  </a>
{:else}
  <a href={href} class="button-style" style={$$props.style}>
    <slot>{label}</slot>
  </a>
{/if}

<style>
  .button-style {
    /* blue/400 */
    --accent-color-rgb: 99, 112, 229;
    /* vars */
    --text-color: white;
    --bg-color: rgba( var(--accent-color-rgb) , 1 );

    /* color styles */
    color: var(--text-color);
    background: var(--bg-color);

    /* Auto layout */
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;

    border: none;
    border-radius: 4px;
    padding: 1rem 2rem;

    /* text */
    font-family: 'Sofia Pro';
    font-style: normal;
    font-weight: 700;
    font-size: 1rem;
    line-height: 1rem;
    text-align: center;

    transition: 300ms ease-out;
  }

  .button-style:hover {
    --text-color: black;
    --bg-color: white;
  }

  .link-style {
    /* blue/400 */
    --accent-color-rgb: 146, 155, 237;
    /* vars */
    --text-color: rgba( var(--accent-color-rgb) , 1 );
    --bg-color: rgba( var(--accent-color-rgb) , 0 );

    /* color styles */
    color: var(--text-color);
    background: var(--bg-color);

    border-radius: 8px;

    /* Auto layout */
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 0.75rem 1rem;

    /* text */
    font-family: 'Sofia Pro';
    font-style: normal;
    font-weight: 700;
    font-size: 1rem;
    line-height: 1rem;
    text-align: center;

    transition: 300ms ease-out;
  }
  .link-style:hover {
    --bg-color: rgba( var(--accent-color-rgb) , 0.2 );
  }

</style>
