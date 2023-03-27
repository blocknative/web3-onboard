# @web3-onboard/testing

## A collection of playwright tests run on the web3-onboard demo

To run tests:
1. cd test/
2. yarn
3. Create .env file in test/ with the following variables:
    a. TEST_WALLET_PHRASE
    b. TEST_WALLET_ADDRESS
    c. SERIAL_MODE=true
4. yarn playwright test metamask

There are 4 existing tests for metamask: connect metamask, sign a message, sign a typed message, send a transaction, switche chains, and disconnect. 

Please note: your test metamask wallet must have a balance of GoerliETH and the polygon chain already set up for all tests to pass. 