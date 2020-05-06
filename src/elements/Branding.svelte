<script>
  export let darkMode
</script>

<style>
  div {
    font-size: 0.66rem;
    height: 1.3rem;
    margin: 0.4rem;
    display: flex;
  }

  a {
    display: flex;
    justify-content: center;
    width: 100%;
    opacity: 0.8;
    color: inherit;
  }

  img {
    height: 100%;
    width: auto;
  }
</style>

<div>
  <a
    href="https://blocknative.com"
    class="bn-onboard-clickable"
    target="_blank"
    rel="noopener noreferrer">
    <img
      alt="Blocknative Logo"
      src={darkMode ? ' https://www.blocknative.com/hubfs/Infrastructure%20Rebrand/bn-structure-logo-white.svg' : 'https://www.blocknative.com/hubfs/Infrastructure%20Rebrand/bn-structure-logo-black.svg'} />
  </a>
</div>
