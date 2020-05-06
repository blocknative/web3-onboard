<script>
  export let darkMode
</script>

<style>
  .bn-branding {
    font-size: 0.75rem;
    font-family: inherit;
    margin: 0.4rem;
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    opacity: 0.3;
  }

  a {
    color: inherit;
    display: flex;
    margin-left: 0.25rem;
    align-items: center;
  }

  .bn-logo {
    height: 0.9rem;
    margin-left: 0.25rem;
    margin-bottom: 0.1rem;
  }

  img {
    height: 100%;
    width: auto;
  }
</style>

<div class="bn-branding">
  Powered by
  <a
    href="https://blocknative.com"
    class="bn-onboard-clickable"
    target="_blank"
    rel="noopener noreferrer">
    Blocknative
    <div class="bn-logo">
      <img
        alt="Blocknative Logo"
        src={darkMode ? 'https://cdn2.hubspot.net/hubfs/5118396/Company Logos/bn-line-logo-white.svg' : 'https://cdn2.hubspot.net/hubfs/5118396/Company Logos/bn-line-logo-black.svg'} />
    </div>
  </a>
</div>
