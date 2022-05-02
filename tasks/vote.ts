/* eslint-disable node/no-unpublished-import */
import { ContractReceipt, ContractTransaction } from "ethers";
import { task } from "hardhat/config";

import CrackingGovernanceAbi from "../artifacts/contracts/CrackingGovernance.sol/CrackingGovernance.json";

task("vote", "Votes in the governance election")
  .addParam("address", "crackingGovernanceAddress which to call")
  .addParam("electionId", "The Id of a certain election")
  .addParam("candidateAddress", "The address for which to vote")
  .setAction(async (taskArgs, hre) => {
    const electionId = taskArgs.electionId;
    const candidateAddress = taskArgs.candidateAddress;

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
    ).vote(electionId, candidateAddress, {
      value: hre.ethers.utils.parseEther("0.01"),
    });

    // console.log(addVotingTx);

    const receipt: ContractReceipt = await addVotingTx.wait();

    // console.log(receipt);

    const resultOfFunction = iface.parseLog(receipt.logs[0]);

    console.log(
      "\nYou successfuly voted for",
      resultOfFunction.args.candidate,
      "\n",
      "your vote for this candidate was",
      resultOfFunction.args.currentVotesForCandidate.toString(),
      "'s\n",
      "current lider has ",
      resultOfFunction.args.currentLiderVotes.toString(),
      "votes"
    );
  });

export {};
