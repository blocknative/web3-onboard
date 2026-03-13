<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Web3-Onboard Vue 2 Demo" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
export default {
  components: {
    HelloWorld,
  },
};
</script>

<style>
:root {
  --vt-c-brand: #42b883;
  --vt-c-brand-dark: #33a06f;
  --vt-c-text-1: rgba(255, 255, 255, 0.87);
  --vt-c-divider: rgba(84, 84, 84, 0.65);
  --vt-c-black: #1a1a1a;
  --vt-c-bg-soft: #242424;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  margin-top: 60px;
}
html {
  background-color: var(--vt-c-black);
}
</style>
