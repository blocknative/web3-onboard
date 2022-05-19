<script lang='ts'>
  export let icon
  export let borderColorVar = ''
  export let size
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

  .protocol-border {
    border: 2px solid #33394b;
    border-radius: 50%;
  }
</style>

<div 
  class={size === 24 ? 'border protocol-border' : 'border'}
  class:border={borderColorVar} 
  style={`
    width: ${size - padding * 2}px; 
    height: ${size - padding * 2}px; 
    border-color: var(${borderColorVar}); 
    padding: ${padding}px; 
    background-color: ${background}
  `}>
  {@html icon}
</div>