<script lang="ts">
  export let btnFunction: (param?: any) => void
  export let btnText: string
</script>

<style>
  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.25rem 0.75rem;
    gap: 0.25rem;
    border-radius: var(--onboard-border-radius-5, var(--border-radius-5));
    background: var(--onboard-gray-700, var(--gray-700));
    color: var(
      --transaction-sim-details-cta-color,
      var(--onboard-primary-400, var(--primary-400))
    );
  }
  button:hover {
    background: rgba(146, 155, 237, 0.2);
  }
</style>

<button on:click|stopPropagation={() => btnFunction(true)}>
  {btnText}
</button>
