export { prerendering } from '../env.js';

/**
 * @type {import('$app/env').browser}
 */
const browser = !import.meta.env.SSR;

/**
 * @type {import('$app/env').server}
 */
const server = !!import.meta.env.SSR;

/**
 * @type {import('$app/env').dev}
 */
const dev = !!import.meta.env.DEV;

/**
 * @type {import('$app/env').prod}
 */
const prod = !import.meta.env.DEV;

/**
 * @type {import('$app/env').mode}
 */
const mode = import.meta.env.MODE;

export { browser, dev, mode, prod, server };
