[![Banner](https://assets.solidjs.com/banner?background=tiles&type=Start&project=template)](https://github.com/solidjs/solid-start)

Kickstart your DeFi app development with this starter template, built with [SolidStart](https://start.solidjs.com) and [Web3Onboard](https://web3onboard.thirdweb.com).
It seamlessly integrates SolidStart’s server-side rendering (_SSR_) with client-side Web3 features, leveraging libraries like [ethers.js](https://github.com/ethers-io/ethers.js).

## Features

- **SSR Compliant**: Web3 code loads only on the client, ensuring compatibility with SSR architecture
- **Auth Context**: A reactive context to monitor wallet changes, handle signatures, and more
- **Local Storage**: Utilizes a lightweight, file-based database with `unstorage` for persistence
- **Starter Kit for DeFi**: Preconfigured setup to kickstart your DeFi app development with SolidStart and Web3Onboard
- **Client-Only**: Easily isolate client-side logic for Web3 interactions

## Getting Started

1. Install dependencies

   ```bash
   # use preferred package manager
   npm install
   ```

2. Run the development server

   ```bash
   # use preferred package manager
   npm run dev
   ```

3. Rename `.env.example` to `.env`. For production, generate a secure `SESSION_SECRET` with

   ```bash
   openssl rand -hex 32
   ```

## Usage

To ensure Web3-related logic runs only on the client, use the `clientOnly` utility from SolidStart. Here are two ways to implement client-only code:

1. **Client-Only Component** (e.g. for a component showing user balance)

   ```jsx
   import { clientOnly } from "@solidjs/start/client";

   const ClientComponent = clientOnly(() => import("./ClientOnlyComponent"));
   ```

2. **Client-Only Page** (e.g. for a `/swap` page)
   Add the following at the top of your route file to render the entire page on the client:

   ```jsx
   import { clientOnly } from "@solidjs/start/client";

   export default clientOnly(async () => ({ default: MyPage }));
   ```

For more details, refer to the `clientOnly` [documentation](https://docs.solidjs.com/solid-start/reference/client/client-only#clientonly).

<div align="center">
   </br>
   </br>
  <img src="public/logo.svg" width="300px">
</div>
