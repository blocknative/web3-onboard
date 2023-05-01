# Unstoppable Domains Resolution

A module to add Unstoppable Domain resolution to web3-onboard.

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @web3-onboard/unstoppable-resolution
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @web3-onboard/unstoppable-resolution
```

  </TabPanel>
</Tabs>

### Standalone Setup

```typescript
import Onboard from '@web3-onboard/core'
import unstoppableResolution from '@web3-onboard/unstoppable-resolution'

const onboard = Onboard({
  // ... other Onboard options
  unstoppableResolution
})
```

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
