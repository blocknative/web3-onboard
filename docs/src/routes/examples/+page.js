import { redirect } from '@sveltejs/kit';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export function load() {
	throw redirect(307, '/examples/connect-wallet');
}
