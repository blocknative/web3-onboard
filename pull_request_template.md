### Description
<!-- Add a description of the fix or feature here -->

### Checklist
- [ ] The version field in `package.json` of the package you have made changes in is incremented following [semantic versioning](https://semver.org/) and using alpha release tagging
- [ ] The box that allows repo maintainers to update this PR is checked
- [ ] I tested locally to make sure this feature/fix works
- [ ] I have run `yarn file-check`, `yarn type-check` & `yarn build` to confirm there are not any associated errors
- [ ] This PR passes the Circle CI checks

### If this PR includes changes to add an injected wallet or SDK wallet module: 
Please complete the following using the internal demo package.
To run this demo use the command `yarn && yarn dev` to get the project running at `http://localhost:8080/`

#### Tests with demo app (injected)
- [ ] send transaction
- [ ] switch chains
- [ ] sign message
- [ ] sign typed message
- [ ] disconnect

#### Tests with demo app (SDK)
- [ ] send transaction
- [ ] switch chains
- [ ] sign message
- [ ] sign typed message
- [ ] disconnect