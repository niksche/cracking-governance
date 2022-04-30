
import { task } from "hardhat/config";


import CrackingGovernanceAbi from "../artifacts/contracts/CrackingGovernance.sol/CrackingGovernance.json"


task("create_governance_voting", "Creates new governance voting", async (taskArgs, hre) => {
    let governanceAbi = CrackingGovernanceAbi.abi;
    
    console.log("governance created",governanceAbi);
    const provider = new hre.ethers.providers.JsonRpcProvider();

    const providerCode = await provider.getCode("0x5FbDB2315678afecb367f032d93F642f64180aa3");

    // ethers.
    const [a,a2] = await hre.ethers.getSigners();

    console.log(a.address);



    const CrackingGovernance = new hre.ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", governanceAbi, a);
    // console.log(CrackingGovernance);

    // let voteTx = await CrackingGovernance.connect(a2).vote(0, a2.address,  { value: hre.ethers.utils.parseEther("0.01") });
    // await voteTx.wait()

    // console.log(voteTx);


    // let voteTx2 = await CrackingGovernance.connect(a2).newGovernanceElection();




    // voteTx = await CrackingGovernance.getELection(0);

    // console.log("voteTx2", voteTx2);

    let voteTx3 = await CrackingGovern  ance.getELection(0);    

    console.log("voteTx3", voteTx3);



    // const voteTx2 = await CrackingGovernance.connect(a2).getElectionDetail(0);

    // const jej = await voteTx2.wait();

    // console.log("providerCode",providerCode);


    

})

task("vote", "Votes in governance election", async () => {
    console.log("voted");
})

task("finish_governance_election", "finishes the governance voting if ", async () => {
    console.log("voted");
})

export { }