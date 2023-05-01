<div>
  <slot />
</div>

<style>
  div {
    /* spacing props*/
    margin: var(--margin, 0);
    padding: var(--padding, 0);

    /* flexbox parent props */
    display: var(--display, flex);
    flex-direction: var(--direction, row);
    flex-wrap: var(--wrap, nowrap);
    gap: var(--gap, 1rem);

    justify-content: var(--justify-content, flex-start);
    align-items: var(--align-items, flex-start);

    /* flexbox child props */
    flex: var(--flex, auto);
  }
</style>
