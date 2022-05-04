// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <=0.9.0;

contract CrackingGovernance {
    uint256 private creationTimestamp;
    string private msgToCaller;
    address private owner;

    event NewVotingAdded(address voter, uint electionId);
    event NewVote(address voter, address candidate, uint currentVotesForCandidate, uint currentLiderVotes);
    event VoteFinished(uint electionId, address finishCallerId, address winner, uint totalPrize);

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

    function addVoting() public returns (uint electionID) {
        electionID = numberOfElection++;
        Election storage e = elections[electionID];
        e.creationTimestamp = block.timestamp;
        e.depositedEthAmount = 0 wei;
        e.active = true;
        emit NewVotingAdded(msg.sender, electionID);
    }

    function getElection(uint electionID) public view returns (uint256, uint, address, uint) {
        Election storage e  =  elections[electionID];
        return (e.creationTimestamp, e.depositedEthAmount, e.currentLider, e.currentMaxVotes);
    }

    function getNumbersOfElection() public view returns (uint) {
        return numberOfElection;
    }

    function vote(uint electionID, address candidate) public payable returns (uint currentVotesForCandidate, uint currentLiderVotes) {
        Election storage e = elections[electionID];
        assert(e.active == true);

        );
        assert(e.voters[msg.sender] == false);

        );
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
        currentVotesForCandidate = e.voteCounter[candidate];
        currentLiderVotes = e.currentMaxVotes;
        emit NewVote(msg.sender, candidate, currentVotesForCandidate, currentLiderVotes);
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


    function finish(uint electionID) public payable returns (address) {
        Election storage e = elections[electionID];
        // TODO: set up timer for 3 days
        require(block.timestamp > e.creationTimestamp + 0 minutes);

        address winner = e.currentLider;
        // TODO: add safemath for calculation 0.9 from deposited amount
        uint weiAmountToWinner = e.depositedEthAmount * 9 / 10;

        e.active = false;

        // check whether that works or not;
        payable(winner).transfer(weiAmountToWinner);

        emit VoteFinished(electionID, msg.sender, winner, weiAmountToWinner);

        return winner;

    }

    // TODO: add helper view function which provide information about voters; 
    // TODO: refactor naming, instead of newVoting -> addVoting, instead of finishGovernanceElection -> finish();

}
