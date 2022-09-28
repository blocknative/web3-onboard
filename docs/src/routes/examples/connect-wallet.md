<script>
    import { ConnectWallet, ReactConnectWallet, SvelteConnectWallet } from '$lib/components'

    const frameworks = ['react', 'svelte']
</script>

# Connect Wallet Button Example

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
