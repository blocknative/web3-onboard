---
title: Connect Wallet Example
description: Learn how to connect a wallet to your dapp with Web3-Onboard. For this example, we are going to use the injected wallets module.
---

<script>
  import { ConnectWallet, ReactConnectWallet, SvelteConnectWallet } from '$lib/components'

  const frameworks = ['react', 'svelte']
</script>

# {$frontmatter.title}

<ConnectWallet />

<div class="w-full  h-5"/>

<Tabs values={frameworks}>
  <TabPanel value="react">
    <ReactConnectWallet />
  </TabPanel>
  <TabPanel value="svelte">
    <SvelteConnectWallet />
  </TabPanel>
</Tabs>
