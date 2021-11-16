<script lang="ts">
  export let label: string
</script>

<style>
  button {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 24px;
    background: white;
    cursor: pointer;
    font: inherit;
    border: 1px solid var(--onboard-gray-100, var(--gray-100));
    animation: pulse infinite 750ms alternate ease-in-out;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    padding: 0.5rem;
    border-radius: 12px;
    border: 1px solid var(--onboard-gray-100, var(--gray-100));
    margin-right: 1rem;
  }

  .placeholder-icon {
    width: 100%;
    height: 100%;
    background: var(--onboard-gray-100, var(--gray-100));
    border-radius: 32px;
  }

  span {
    color: var(--onboard-gray-100, var(--gray-100));
    background: var(--onboard-gray-100, var(--gray-100));
    border-radius: 8px;
    box-sizing: border-box;
  }

  @keyframes pulse {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
</style>

<button disabled>
  <div class="container">
    <div class="placeholder-icon" />
  </div>
  <span>{label}</span>
</button>
