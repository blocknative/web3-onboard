<script lang="ts">
  export let icon: string
  export let borderColorVar: string
  export let size: number
  export let padding = 0
  export let background = 'transparent'
</script>

<style>
  div {
    box-sizing: content-box;
  }

  .border {
    border: 2px solid;
    border-radius: 120px;
    overflow: hidden;
  }
</style>

<div
  class="border"
  style={`
    width: ${size - padding * 2}px; 
    height: ${size - padding * 2}px; 
    border-color: var(${borderColorVar}); 
    padding: ${padding}px; 
    background-color: ${background};
    border-radius: 50%;
    display: flex;
    justify-content: center;
  `}
>
  {@html icon}
</div>
