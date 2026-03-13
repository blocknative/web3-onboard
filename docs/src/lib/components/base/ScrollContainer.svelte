<div class="scroll-container" style={$$props.style}>
  <slot />
</div>

<style>
  .scroll-container {
    width: 100%;
    overflow-x: scroll;
  }
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scroll-container::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .scroll-container {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
