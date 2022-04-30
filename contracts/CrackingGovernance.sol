// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <=0.9.0;

import "hardhat/console.sol";


// understand how to handle money storage
// for example someone sends me money, where does contract put it at the firts place

contract CrackingGovernance {
    uint256 private creationTimestamp;
    string private msgToCaller;
    address private owner;


    struct Election {
        uint256 creationTimestamp;
        mapping(address => uint) voteCounter;
        mapping(address => bool) voters;
        uint depositedEthAmount;
        address currentLider;
        uint currentMaxVotes;
        bool active;
        uint totalVotes;
    }

    uint private numberOfElection;

    mapping (uint => Election) public elections;

    constructor() {
        owner = msg.sender;
        creationTimestamp = block.timestamp;
    }

    function newGovernanceElection() public returns (uint electionID) {
        electionID = numberOfElection++;
        Election storage e = elections[electionID];
        e.creationTimestamp = block.timestamp;
        e.depositedEthAmount = 0 wei;
        e.active = true;
    }

    function getELection(uint electionID) public view returns (uint256, uint, address, uint) {
        Election storage e  =  elections[electionID];
        return (e.creationTimestamp, e.depositedEthAmount, e.currentLider, e.currentMaxVotes);
    }

    function getNumbersOfElection() public view returns (uint) {
        return numberOfElection;
    }

    function vote(uint electionID, address candidate) public payable {
        Election storage e = elections[electionID];
        assert(e.active == true);
        assert(e.voters[msg.sender] == false);
        // if (block.timestamp > auctionEndTime)
        //     revert AuctionAlreadyEnded();
        
        assert(msg.value == 10000000000000000 wei);

        if (e.currentMaxVotes < ++e.voteCounter[candidate]) {
            e.currentLider = candidate;
            e.currentMaxVotes = e.voteCounter[candidate];
        }

        e.voters[msg.sender] = true;
        e.depositedEthAmount += 10000000000000000 wei;
        e.totalVotes++;
        console.log("heh", e.depositedEthAmount);
    }

    function getElectionDetail(uint electionID) public view returns (bool, uint256, uint, address, uint, uint) {
        Election storage e = elections[electionID];
        return (e.active, e.creationTimestamp, e.depositedEthAmount, e.currentLider, e.currentMaxVotes, e.totalVotes);
    }


    function withdrawComission(uint electionID) public payable {
        require(msg.sender == owner);
        Election storage e = elections[electionID];
        require(e.active == false);
        uint weiAmountComission = e.depositedEthAmount / 10;
        payable(owner).transfer(weiAmountComission);
    }


    function finishGovernanceElection(uint electionID) public payable returns (address) {
        Election storage e = elections[electionID];
        require(block.timestamp > e.creationTimestamp + 0 minutes);

        address winner = e.currentLider;
        // TODO: add safemath for calculation 0.9 from deposited amount
        console.log("full deposit: ", e.depositedEthAmount);
        uint weiAmountToWinner = e.depositedEthAmount * 9 / 10;

        console.log("full deposit: ", weiAmountToWinner);

        e.active = false;

        console.log("balance before: ", address(winner).balance);

        // check whether that works or not;
        payable(winner).transfer(weiAmountToWinner);

        return winner;

    }

}
