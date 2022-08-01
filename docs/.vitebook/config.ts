import { clientPlugin, defineConfig } from '@vitebook/client/node'
import { svelteMarkdownPlugin } from '@vitebook/markdown-svelte/node'
import { defaultThemePlugin, DefaultThemeConfig } from '@vitebook/theme-default/node'
import { shikiMarkdownPlugin } from '@vitebook/markdown-shiki/node'

export default defineConfig<DefaultThemeConfig>({
  include: ['src/**/*.md', 'src/**/*.story.svelte'],
  alias: {
    $app: '/node_modules/@sveltejs/kit/assets/app',
    $lib: '/src/lib',
  },
  plugins: [
    shikiMarkdownPlugin(),
    svelteMarkdownPlugin({
      anchor: {
        level: 2,
      },
      code: {
        lineNumbers: false,
      },
    }),
    clientPlugin({ appFile: 'App.svelte' }),
    defaultThemePlugin(),
  ],
  site: {
    title: 'Blocknative Documentation',
    description: 'Documentation for Web3-Onboard',
    /** @type {(import('@vitebook/theme-default/node').DefaultThemeConfig} */
    theme: {
      navbar: {},
      sidebar: {
        style: 'docs',
        categories: true,
      },
      markdown: {
        toc: true,
        editLink: true,
        editLinkText: 'Edit this page on GitHub',
        prevLink: true,
        nextLink: true,
        lastUpdated: true,
        remoteGitRepo: {
          dir: 'docs',
        },
      },
      remoteGitRepo: {
        url: 'blocknative/docs',
      },
    },
  },
})
