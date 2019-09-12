import blocknativeApi from "bn-sdk"
import { app } from "./stores"

export let blocknative

app.subscribe(({ dappId, networkId }) => {
  if (dappId) {
    blocknative = blocknativeApi({
      dappId,
      networkId
    })
  }
})
