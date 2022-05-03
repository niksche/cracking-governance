import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { CrackingGovernance, CrackingGovernance__factory } from "../typechain";
// import { ethers } from "ethers";
// import { ethers } from "hardhat";

describe("Cracking governance contract", function () {
  let CrackingGovernanceFactory;
  let CrackingGovernance: CrackingGovernance;
  let owner: SignerWithAddress;
  let account1: SignerWithAddress;
  let account2: SignerWithAddress;
  let accounts: SignerWithAddress[];

  beforeEach(async function () {
    CrackingGovernanceFactory = await ethers.getContractFactory(
      "CrackingGovernance"
    );
    [owner, account1, account2, ...accounts] = await ethers.getSigners();
    CrackingGovernance = await CrackingGovernanceFactory.deploy();
  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    it("Should set electionsCount to zerro once contract is created", async function () {
      expect(await CrackingGovernance.getNumbersOfElection()).to.equal("0");
    });

  });

  describe("addVoting", function () {
    it("The first created voting returns id, which is equal to zero also total numbers of election increased by 1", async function () {
      const createGovernanceVotingTx = await CrackingGovernance.addVoting();
      expect(createGovernanceVotingTx.value).to.equal(0);
      expect(await CrackingGovernance.getNumbersOfElection()).to.equal("1");
    });
  })

  describe("vote", function () {
    it("do something that give me hint on state changing", async function () {
      const createGovernanceVotingTx = await CrackingGovernance.addVoting();

      const voteTx = await CrackingGovernance.connect(owner).vote(0, account1.address,  { value: ethers.utils.parseEther("0.01") });
      const voteTx2 = await CrackingGovernance.connect(account1).vote(0, account2.address,  { value: ethers.utils.parseEther("0.01") });

      // TODO: localize the test for vote function only
    })
  })

  describe("finish", function() {
    it("finishes the elction, all tokens are transfered according to the result", async function() {
      const createGovernanceVotingTx = await CrackingGovernance.addVoting();

      const voteTx = await CrackingGovernance.connect(owner).vote(0, account1.address,  { value: ethers.utils.parseEther("0.01") });
      const voteTx2 = await CrackingGovernance.connect(account1).vote(0, account2.address,  { value: ethers.utils.parseEther("0.01") });
      const callForEnd = await CrackingGovernance.connect(account1).finish(0);
      const comissionTx = await CrackingGovernance.connect(owner).withdrawComission(0);


      const fwefe = await callForEnd.wait();
    })
  })



});
