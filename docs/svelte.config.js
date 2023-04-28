import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	kit: {
		adapter: adapter(),

		prerender: {
			entries: ['*'],
			handleHttpError: 'warn',
			handleMissingId: 'warn'
		}
	},

	package: {
		dir: 'client',
		emitTypes: true
	},
	preprocess: [preprocess()]
};

export default config;
