# Web3-Onboard + NextJs



This should serve as a reference example for how to integrate Web3-Onboard with a NextJs app! 🙌

The [web3-onboard.ts](./web3-onboard.ts) file contains everything necessary to configure and initialize Web3-Onboard.

Here's the TL;DR

1. Wrap the provider

[_app.tsx](./pages/_app.tsx)
```react
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <Component {...pageProps} />
    </Web3OnboardProvider>
  )
}
```

2. Import and Setup

[index.tsx](./pages/index.tsx)
```ts
// ...
export default function Home() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()

  // create an ethers provider
  let ethersProvider

  if (wallet) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any')
  }
  
  return (/* ... */)
}
```

3. Add the wallet connect button

[index.tsx](./pages/index.tsx)
```html
<button
    style={buttonStyles}
    disabled={connecting}
    onClick={() => (wallet ? disconnect(wallet) : connect())}
>
    {connecting ? 'Connecting' : wallet ? 'Disconnect' : 'Connect'}
</button>
```

And that's it! 🎉 You should be well on your way to **buidl**ing that next killer dApp!

--- 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
