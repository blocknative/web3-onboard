<script>
  export let title = 'Your Title'
  export let text = 'Your Text'
</script>

<div class="card">
  <div class="title">{title}</div>
  <div class="text">{text}</div>
</div>

<style>
  .card {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 20px;
    gap: 8px;

    /* width: 308px; */
    /* height: 208px; */
    width: 100%;

    background: #060d20;
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  .title {
    font-family: 'Sofia Pro';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    /* identical to box height, or 120% */

    /* display: flex;
    align-items: center; */

    /* blue/100 */
    color: #eff1fc;
  }

  .text {
    font-family: 'Sofia Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    /* or 150% */

    /* display: flex;
    align-items: center; */

    /* grey/200 */
    color: #c2c4c9;
  }
</style>
