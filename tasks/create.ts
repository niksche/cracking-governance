/* eslint-disable node/no-unpublished-import */
import { ContractReceipt, ContractTransaction } from "ethers";
import { task } from "hardhat/config";

import CrackingGovernanceAbi from "../artifacts/contracts/CrackingGovernance.sol/CrackingGovernance.json";

task("create_governance_voting", "Creates new governance voting")
  .addParam("address", "crackingGovernanceAddress which to call")
  .setAction(async (taskArgs, hre) => {
    const governanceAbi = CrackingGovernanceAbi.abi;

    const provider = new hre.ethers.providers.JsonRpcProvider();

    const iface = new hre.ethers.utils.Interface(governanceAbi);

    const providerCode = await provider.getCode(taskArgs.address);

    if (providerCode) {
      if (providerCode === "0x") {
        console.log("Cobtract with such an address does not exist");
        return;
      }
    }

    const [owner] = await hre.ethers.getSigners();

    const CrackingGovernance = new hre.ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      governanceAbi,
      owner
    );

    const addVotingTx: ContractTransaction = await CrackingGovernance.connect(
      owner
    ).addVoting();

    const receipt: ContractReceipt = await addVotingTx.wait();

    const resultOfFunction = iface.parseLog(receipt.logs[0]);

    console.log(
      "You successfully created election with electionID =",
      resultOfFunction.args.electionId.toString(),
      "from address:",
      resultOfFunction.args.voter
    );
  });

export {};
