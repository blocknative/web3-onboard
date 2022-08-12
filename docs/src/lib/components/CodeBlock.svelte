<script>
  import CodeTabs from './svg/CodeTabs.svelte'
</script>

<div>
  <CodeTabs />
  <pre><code><slot /></code></pre>
</div>

<style>
  pre {
    /* brand/yellow */
    color: #f0d948;
    /* grey/700 */
    background: #1a1d26;
    border: 1px solid #33394b;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

    padding: 1rem;
    border-radius: 0.5rem;

    font-family: monospace;
    /* white-space: pre-wrap; */
    overflow-x: auto;
    /* max-width: 100%; */
    /* height:auto; */
  }
</style>
