// SPDX-License-Identifier: MIT
// pragma solidity >=0.7.0 <0.9.0;

// contract Donation {
//     event CampaignStarted(uint256 campaignId, address initiator);
//     event WithdrawFunds(uint256 campaignId, address initiator, uint256 amount);
//     event FundsDonated(uint256 campaignId, address donor, uint256 amount);
//     event CampaignEnded(uint256 campaignId, address initiator);

//     uint8  private _campaignCount;

//     struct Campaign {
//         string title;
//         string description;
//         bool isLive; 
//         address initiator;
//         uint256 deadline;
//         uint256 balance;
//     }

//     mapping(uint256 => uint256) public _campaignsList;
//     mapping(uint256 => Campaign) public _campaigns;
//     mapping(address => mapping(uint256 => uint256))
//         public userCampaignDonations;

//     constructor() {}

//     function getCampaignCount() public view returns (uint256) {
//         return _campaignCount;
//     }

//     function generateCampaignId(
//         address initiator,
//         string calldata title,
//         string calldata description
//     ) public pure returns (uint256) {
//         uint256 campaignId = uint256(keccak256(
//             abi.encodePacked(title, description, initiator))
//         );
//         return campaignId;
//     }

//     function startCampaign(
//         string calldata title,
//         string calldata description,
        
//         uint256 deadline
//     ) public {
//         // generate a campaignID
//         // using the title, description and the address of the initiator
//         uint256 campaignId = generateCampaignId(msg.sender, title, description);

//         // get a reference to the campaign with the generated Id
//         Campaign storage campaign = _campaigns[campaignId];
//         // require that the campaign is not live yet.
//         require(!campaign.isLive, "Campaign exists");
//         // require the current time to be less than the campaign deadline
//         require(block.timestamp < deadline, "Campaign ended");

//         campaign.title = title;
//         campaign.description = description;
//         campaign.initiator = msg.sender;
       
//         campaign.deadline = deadline;
//         campaign.isLive = true;

//         _campaignsList[_campaignCount] = campaignId;

//         // increment the total number of charity campaigns created
//         _campaignCount = _campaignCount + 1;

//         // emit an event to the blockchain
//         emit CampaignStarted(campaignId, msg.sender);
//     }

//     function endCampaign(uint256 campaignId) public {
//         Campaign storage campaign = _campaigns[campaignId];

//         // require the msg.sender is the creator of the campaign
//         require(msg.sender == campaign.initiator, "Not campaign initiator");
//         // require the campaign is alive
//         require(campaign.isLive, "campaign is not active");

//         campaign.isLive = false;
//         campaign.deadline = block.timestamp;

//         emit CampaignEnded(campaignId, msg.sender);
//     }

//     // allows users to donate to a charity campaign of their choice
//     function donateToCampaign(uint256 campaignId) public payable {
//         // get campaign details with the given campaign
//         Campaign storage campaign = _campaigns[campaignId];

//         // end the campaign if the deadline is exceeded
//         if (block.timestamp > campaign.deadline) {
//             campaign.isLive = false;
//         }
//         // require the campaign has not ended
//         require(block.timestamp < campaign.deadline, "Campaign has ended");

//         uint256 amountToDonate = msg.value;
//         require(amountToDonate > 0, "Wrong ETH value");

//         // increase the campaign balance by the amount donated;
//         campaign.balance += amountToDonate;

//         // keep track of users donation history
//         userCampaignDonations[msg.sender][campaignId] += amountToDonate;

//         // emit FundsDonated event
//         emit FundsDonated(campaignId, msg.sender, amountToDonate);
//     }

//     // returns the details of a campaign given the campaignId
//     function getCampaign(uint256 campaignId)
//         public
//         view
//         returns (Campaign memory)
//     {
//         return _campaigns[campaignId];
//     }

//     function withdrawCampaignFunds(uint256 campaignId) public {
//         Campaign storage campaign = _campaigns[campaignId];

//         // require the msg.sender is the creator of the campaign
//         require(msg.sender == campaign.initiator, "Not campaign initiator");
//         // require the campaign has ended
//         require(!campaign.isLive, "campaign is still active");
//         require(
//             block.timestamp > campaign.deadline,
//             "Campaign is still active"
//         );
//         // require the campaign has funds to be withdrawn
//         require(campaign.balance > 0, "No funds to withdraw");

//         uint256 amountToWithdraw = campaign.balance;

//         // zero the campaign balance
//         campaign.balance = 0;

//         // transfer the balance to the initiator address;
//         payable(campaign.initiator).transfer(amountToWithdraw);

//         // emit an event to the blockchain
//         emit WithdrawFunds(campaignId, campaign.initiator, amountToWithdraw);
//     }
// }

pragma solidity >=0.7.0 <0.9.0;

contract Donation {
    event CampaignStarted(uint256 campaignId, address initiator);
    event WithdrawFunds(uint256 campaignId, address initiator, uint256 amount);
    event FundsDonated(uint256 campaignId, address donor, uint256 amount);
    event CampaignEnded(uint256 campaignId, address initiator);

    uint8  private _campaignCount;

    struct Campaign {
        string title;
        string description;
        bool isLive; 
        address initiator;
        uint256 deadline;
        uint256 balance;
    }

    mapping(uint256 => uint256) public _campaignsList;
    mapping(uint256 => Campaign) public _campaigns;
    mapping(address => mapping(uint256 => uint256))
        public userCampaignDonations;

    constructor() {}

    function getCampaignCount() public view returns (uint256) {
        return _campaignCount;
    }

    function generateCampaignId(
        address initiator,
        string calldata title,
        string calldata description
    ) public pure returns (uint256) {
        uint256 campaignId = uint256(keccak256(
            abi.encodePacked(title, description, initiator))
        );
        return campaignId;
    }

    function startCampaign(
        string calldata title,
        string calldata description,
        
        uint256 deadline
    ) public returns(uint256){
        // generate a campaignID
        // using the title, description and the address of the initiator
        uint256 campaignId = generateCampaignId(msg.sender, title, description);

        // get a reference to the campaign with the generated Id
        Campaign storage campaign = _campaigns[campaignId];
        // require that the campaign is not live yet.
        require(!campaign.isLive, "Campaign exists");
        // require the current time to be less than the campaign deadline
        require(block.timestamp < deadline, "Campaign ended");

        campaign.title = title;
        campaign.description = description;
        campaign.initiator = msg.sender;
       
        campaign.deadline = deadline;
        campaign.isLive = true;

        _campaignsList[_campaignCount] = campaignId;

        // increment the total number of charity campaigns created
        _campaignCount = _campaignCount + 1;

        // emit an event to the blockchain
        emit CampaignStarted(campaignId, msg.sender);
        return campaignId;
    }

    function endCampaign(uint256 campaignId) public {
        Campaign storage campaign = _campaigns[campaignId];

        // require the msg.sender is the creator of the campaign
        require(msg.sender == campaign.initiator, "Not campaign initiator");
        // require the campaign is alive
        require(campaign.isLive, "campaign is not active");

        campaign.isLive = false;
        campaign.deadline = block.timestamp;

        emit CampaignEnded(campaignId, msg.sender);
    }

    // allows users to donate to a charity campaign of their choice
    function donateToCampaign(uint256 campaignId) public payable {
        // get campaign details with the given campaign
        Campaign storage campaign = _campaigns[campaignId];

        // end the campaign if the deadline is exceeded
        if (block.timestamp > campaign.deadline) {
            campaign.isLive = false;
        }
        // require the campaign has not ended
        require(block.timestamp < campaign.deadline, "Campaign has ended");

        uint256 amountToDonate = msg.value;
        require(amountToDonate > 0, "Wrong ETH value");

        // increase the campaign balance by the amount donated;
        campaign.balance += amountToDonate;

        // keep track of users donation history
        userCampaignDonations[msg.sender][campaignId] += amountToDonate;

        // emit FundsDonated event
        emit FundsDonated(campaignId, msg.sender, amountToDonate);
    }

    // returns the details of a campaign given the campaignId
    function getCampaign(uint256 campaignId)
        public
        view
        returns (Campaign memory)
    {
        return _campaigns[campaignId];
    }

    function withdrawCampaignFunds(uint256 campaignId) public {
        Campaign storage campaign = _campaigns[campaignId];

        // require the msg.sender is the creator of the campaign
        require(msg.sender == campaign.initiator, "Not campaign initiator");
        // require the campaign has ended
        require(!campaign.isLive, "campaign is still active");
        require(
            block.timestamp > campaign.deadline,
            "Campaign is still active"
        );
        // require the campaign has funds to be withdrawn
        require(campaign.balance > 0, "No funds to withdraw");

        uint256 amountToWithdraw = campaign.balance;

        // zero the campaign balance
        campaign.balance = 0;

        // transfer the balance to the initiator address;
        payable(campaign.initiator).transfer(amountToWithdraw);

        // emit an event to the blockchain
        emit WithdrawFunds(campaignId, campaign.initiator, amountToWithdraw);
    }
}