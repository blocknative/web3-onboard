import BlocknativeApi from "./bn-client-sdk"
import { app } from "./stores"

export let blocknative

app.subscribe(({ dappId, networkId }) => {
  if (dappId) {
    blocknative = BlocknativeApi({
      dappId,
      networkId
    })
  }
})
