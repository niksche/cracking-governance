import { expect } from "chai";
import { ethers } from "hardhat";

describe("GovernanceCracking", function () {
  describe("Deployment", function () {

  });


  it("Should set electionsCount to zerro once contract is created", async function () {
    const CrackingGovernance = await ethers.getContractFactory("CrackingGovernance");
    const cracker = await CrackingGovernance.deploy();
    await cracker.deployed();

    expect(await cracker.getNumbersOfElection()).to.equal("0");
    

    const createGovernanceVotingTx = await cracker.addVoting();

    expect(createGovernanceVotingTx.value).to.equal(0);
    
    const [owner, firstacc, secondacc] = await ethers.getSigners();

    let getELectionState = await cracker.getElection(0)

    // console.log(heh);
    // console.log("election map is: ",getELectionState)


    const voteTx = await cracker.connect(owner).vote(0, secondacc.address,  { value: ethers.utils.parseEther("0.01") });

    // console.log("owner: ",owner);
    // console.log("address: ",owner.address);

    const voteTx2 = await cracker.connect(firstacc).vote(0, secondacc.address,  { value: ethers.utils.parseEther("0.01") });

    // const voteTx3 = await cracker.connect(owner).vote(0, firstacc.address,  { value: ethers.utils.parseEther("0.01") });
    // const voteTx4 = await cracker.connect(secondacc).vote(0, secondacc.address,  { value: ethers.utils.parseEther("0.01") });



    let heh  = await voteTx.wait();
    await voteTx2.wait();
    // await voteTx3.wait();

    // await voteTx4.wait();
    

    getELectionState = await cracker.getElection(0)

    // console.log(heh);

    // TODO: add methods to publicly get data on governance auction 
    // expect().to.equal("fwef");


    const callForEnd = await cracker.connect(firstacc).finish(0);

    const fwefe = await callForEnd.wait();
    // console.log('declare the winner: ',fwefe);

    // expect(fwefe).to.equal(secondacc.address);

    console.log('before:',await owner.getBalance());

    const comissionTx = await cracker.connect(owner).withdrawComission(0);

    console.log("after",await owner.getBalance());


    const electionDetailsTx = await cracker.connect(owner).getElectionDetail(0);
    console.log(electionDetailsTx);



    // const voteTx4 = await cracker.connect(secondacc).vote(0, secondacc.address,  { value: ethers.utils.parseEther("0.01") });



  });

  
});
