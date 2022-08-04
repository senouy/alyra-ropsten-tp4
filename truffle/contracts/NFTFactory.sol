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

    string cid;

    mapping(address => uint256[]) public _tokensByAddress;


    constructor(string memory _name, string memory _symbol, string memory _cid, uint _price) ERC721(_name, _symbol) {
        cid = _cid;
        price=_price;
     }

    function totalSupply() public view returns (uint){
        return total;
    }
    
    //use the mint function to create an NFT. Mint le plus simple possible ic
    function mint(uint _tokenId, address _origin) public payable returns (uint256){
        require(msg.value>=price, string.concat("Not the good price - ",Strings.toString(msg.value) ,(" - "), Strings.toString(price)));
        require(totalSupply() + _tokenId <= 30, "Max supply exceeded");
        
        _mint(_origin, _tokenId);
        _tokensByAddress[_origin].push(_tokenId);
        return _tokenId;
    }

    function isMinted(uint256 _tokenId) public view returns(bool) {
        return _exists(_tokenId);
    }

    //in the function below include the CID of the JSON folder on IPFS
    function getTokenURI(uint256 _tokenId) public view returns(string memory) {
        return string(
            abi.encodePacked(string.concat("https://gateway.pinata.cloud/ipfs/", cid, "/"),Strings.toString(_tokenId),".json")
            );
    }

    function getMetadataURI() public view returns (string memory) {
        return string(
            abi.encodePacked(string.concat("https://gateway.pinata.cloud/ipfs/", cid, "/_metadata.json"))
            );
    }

    function getTokenByAddress(address _address) external view returns(uint256[] memory){
        return _tokensByAddress[_address];
    }

    function withdraw() public view onlyOwner{
        msg.sender.call{value: address(this).balance};
    }

}