# Cracking governance

![crackingGovernanceScheme](https://my.vcv.ru/storage/company-file/586d7126ba7e4610e36f9abf3170eef4/12310/586d7126ba7e4610e36f9abf3170eef4.jpeg)

This project aims to challenge myself in writing smart contracts
The project comes with a crackingGovernance contract, a test for that contract, a script that deploys that contract, and few tasks implementation, which calls contract's methods. It also comes with a variety of other tools, configured to work with the project code.

Supported commands:

```shell

npx hardhat run scripts/deploy.ts --network localhost
npx hardhat create_governance_voting --network localhost --address 0x5FbDB2315678afecb367f032d93F642f64180aa3
npx hardhat vote --show-stack-traces --network localhost --address  0x5FbDB2315678afecb367f032d93F642f64180aa3 --candidate-address 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --election-id 0
npx hardhat finish --show-stack-traces --network localhost --address  0x5FbDB2315678afecb367f032d93F642f64180aa3  --election-id 0

```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/deploy.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network rinkeby DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).


# Refactor command

``` Shell 
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```
