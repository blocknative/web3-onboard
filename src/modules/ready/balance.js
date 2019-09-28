function balance(minimum) {
  return ({ balance, BigNumber }) => {
    // if balance is less than minimum (compare < 1)
    if (BigNumber(balance).lte(BigNumber(minimum || 0))) {
      return {
        heading: "Get Some ETH",
        description: `Your current account has less than the necessary minimum balance of ${BigNumber(
          minimum
        )
          .div(BigNumber("1000000000000000000"))
          .toString()} ETH.`,
        eventCode: "nsfFail",
        icon: `
        <svg height="18" viewBox="0 0 429 695" width="18" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" fill-rule="evenodd"><path d="m0 394 213 126.228516 214-126.228516-214 301z"/><path d="m0 353.962264 213.5-353.962264 213.5 353.962264-213.5 126.037736z"/></g></svg>
        `
      }
    }
  }
}

export default balance
