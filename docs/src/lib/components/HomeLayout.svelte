<script>
	import Footer from './Footer.svelte';
</script>

<div class="layout-container">
	<div class="body">
		<slot name="hero" />
		<slot name="features" />
		<slot name="theming" />
		<slot name="testimonial" />
		<slot name="gettingStarted" />
	</div>
	<Footer />
</div>

<style>
	.layout-container {
		position: absolute;
		top: 5em;
		left: 0;
		width: 100%;
		--text-color: #fff;
		--background-color: #000;

		display: flex;
		flex-flow: column;

		color: var(--text-color);
		background-color: var(--background-color);
	}

	.body {
		flex: 1 1 auto;
		overflow: hidden;
	}

	:global(html, body) {
		margin: 0;
		padding: 0;
	}
</style>
