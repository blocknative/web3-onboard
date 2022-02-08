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
  }

  span {
    opacity: 0.3;
  }

  a {
    color: inherit;
    display: flex;
    margin-left: 0.25rem;
    align-items: center;
  }

  .bn-logo {
    height: 1.1rem;
    margin-left: 0.25rem;
    margin-bottom: 0.1rem;
  }

  svg {
    height: 100%;
    width: auto;
  }
</style>

<div class="bn-branding">
  <span>Powered by</span>
  <a
    href="https://hubs.ly/H0qh2g10"
    class="bn-onboard-clickable"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span>Blocknative</span>
    <div class="bn-logo">
      {#if darkMode}
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 380.94 434.03"
          height="130"
          width="91"
        >
          <defs>
            <style>
              .cls-1 {
                fill: #fff;
              }
              .cls-2 {
                fill: url(#linear-gradient);
              }
              .cls-3 {
                fill: url(#linear-gradient-2);
              }
            </style>
            <linearGradient
              id="linear-gradient"
              x1="2.19"
              y1="163.03"
              x2="188.9"
              y2="163.03"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#55ccfe" />
              <stop offset="1" stop-color="#5e93ef" />
            </linearGradient>
            <linearGradient
              id="linear-gradient-2"
              x1="2.19"
              y1="324.73"
              x2="375.61"
              y2="324.73"
              xlink:href="#linear-gradient"
            />
          </defs>
          <polygon
            class="cls-1"
            points="64.42 324.73 2.19 216.93 126.66 216.93 126.66 216.93 188.9 324.73 64.42 324.73"
          />
          <polygon
            class="cls-2"
            points="126.66 216.93 2.19 216.93 64.42 109.13 188.9 109.13 126.66 216.93"
          />
          <polygon
            class="cls-1"
            points="251.14 216.93 188.9 109.13 64.42 109.13 2.19 1.33 251.14 1.33 375.61 216.93 251.14 216.93"
          />
          <polygon
            class="cls-3"
            points="251.14 432.53 2.19 432.53 64.42 324.73 188.9 324.73 251.14 216.93 375.61 216.93 251.14 432.53"
          />
        </svg>
      {:else}
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 380.94 434.03"
          height="130"
          width="91"
        >
          <defs>
            <style>
              .cls-1 {
                fill: #262a3d;
              }
              .cls-2 {
                fill: url(#linear-gradient);
              }
              .cls-3 {
                fill: url(#linear-gradient-2);
              }
            </style>
            <linearGradient
              id="linear-gradient"
              x1="2.19"
              y1="163.03"
              x2="188.9"
              y2="163.03"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#55ccfe" />
              <stop offset="1" stop-color="#5e93ef" />
            </linearGradient>
            <linearGradient
              id="linear-gradient-2"
              x1="2.19"
              y1="324.73"
              x2="375.61"
              y2="324.73"
              xlink:href="#linear-gradient"
            />
          </defs>
          <polygon
            class="cls-1"
            points="64.42 324.73 2.19 216.93 126.66 216.93 126.66 216.93 188.9 324.73 64.42 324.73"
          />
          <polygon
            class="cls-2"
            points="126.66 216.93 2.19 216.93 64.42 109.13 188.9 109.13 126.66 216.93"
          />
          <polygon
            class="cls-1"
            points="251.14 216.93 188.9 109.13 64.42 109.13 2.19 1.33 251.14 1.33 375.61 216.93 251.14 216.93"
          />
          <polygon
            class="cls-3"
            points="251.14 432.53 2.19 432.53 64.42 324.73 188.9 324.73 251.14 216.93 375.61 216.93 251.14 432.53"
          />
        </svg>
      {/if}
    </div>
  </a>
</div>
