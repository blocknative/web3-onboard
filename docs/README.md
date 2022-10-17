# Docs

## Prereqs

Install [yarn](https://classic.yarnpkg.com/en/docs/install)

## Running docs server locally

Run the following command within the `docs/` folder

```sh
yarn && yarn dev
```

The server should start on [localhost:3000](http://localhost:3000/).

## Contributing

Confirm changes look as expected on local instance.

Run `yarn build` and confirm no errors present from the proposed changes.

Confirm vercel build within PR builds without error and check instance deployment for accuracy.

PR should target branch [docs-develop](https://github.com/blocknative/web3-onboard/tree/docs-develop).