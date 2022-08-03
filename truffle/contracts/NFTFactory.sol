// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

//import Open Zepplin contracts

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract NFTFactory is Ownable, ERC721 {
    uint256 private _tokenIds;
    uint price;
    uint total;

    string public metadataURI;

    mapping(address => bool) hasNFT;

    constructor(string memory _name, string memory _symbol, string memory _metadataURI, uint _price) ERC721(_name, _symbol) {
        metadataURI = _metadataURI;
        price=_price;
     }

    function totalSupply() public view returns (uint){
        return total;
    }
    
    //use the mint function to create an NFT. Mint le plus simple possible ic
    function mint(uint _tokenId) public payable returns (uint256){
        require(msg.value>=price, string.concat("Not the good price - ",Strings.toString(msg.value) ,(" - "), Strings.toString(price)));
        //require(hasNFT[msg.sender]==false, "vous avez deja un nft");
        require(totalSupply() + _tokenId <= 30, "Max supply exceeded");

        hasNFT[msg.sender]=true;
        
        _mint(msg.sender, _tokenId);
        return _tokenId;
    }

    function isMinted(uint256 _tokenId) public view returns(bool) {
        return _exists(_tokenId);
    }

    //in the function below include the CID of the JSON folder on IPFS
    function tokenURI(uint256 _tokenId) override public view returns(string memory) {
        return string(
            abi.encodePacked(string.concat("https://gateway.pinata.cloud/ipfs/",metadataURI,"/"),Strings.toString(_tokenId),".json")
            );
    }

    function withdraw() public view onlyOwner{
        msg.sender.call{value: address(this).balance};
    }

}