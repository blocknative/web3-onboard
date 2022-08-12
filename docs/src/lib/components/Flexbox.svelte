<div>
  <slot></slot>
</div>

<style>
  div {
    /* flexbox props */
    /* --flex: 1 1 100%; */
    /* --display: flex; */
    /* --direction: row; */
    /* --gap: var(--flex-gap, 1rem); */
    /* spacing props*/
    --padding: 0;
    --margin: 0;

    /* Auto layout */
    display: var(--display, flex);
    flex-direction: var(--direction, row);
    flex-wrap: var(--wrap, nowrap);
    gap: var(--gap, 1rem);

    flex: var(--flex, auto);

    /* align-items: center; */
    /* justify-content: space-between; */

    margin: var(--margin, 0);
    padding: var(--padding, 0);
  }
</style>
