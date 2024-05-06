export async function request(url: string, call: object): Promise<any> {
    // SOURCE: https://github.com/blocknative/web3-onboard/blob/ddfb620c62202b24adfe41994037d9609a697e0d/packages/hw-common/src/index.ts
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: '42',
        ...call
      })
    })
    const json = await response.json()
    if ('error' in json) {
      throw json.error
    }
    return json.result
  }