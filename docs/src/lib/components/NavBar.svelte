<script>
  import IconBN from './icons/blocknative.svelte'
  import IconGithub from './icons/github.svelte'
</script>

<nav>
  <IconBN />
  <div class="link-list">
    <a href="#!">{'Docs'}</a>
    <a href="#!">{'Examples'}</a>
    <a href="#!">{'FAQ'}</a>
  </div>
  <a href="#!">
    <IconGithub />
  </a>
</nav>

<style>
  nav {
    position: fixed;
    z-index: 99;
    top: 0;
    width: 100%;
    min-height: 4rem;

    color: white;
    background: rgba(6, 13, 32, 0.8);
    border: 1px solid #0f182e;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
  }
  .link-list {
    display: flex;
    gap: 2rem;
  }
</style>
