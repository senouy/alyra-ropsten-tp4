// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "./NFTFactory.sol";

contract PlatformOpenSky {

  struct Collection {
    address contractAddress;
    address owner;
    string name;
    uint nftPrice;
  }
  
  Collection[] public listCollection;
  mapping (address => uint[]) mapCollectionByOwner;

  function createCollection (string calldata _name, string calldata _symbol, string calldata _cid, uint _price) external{
    NFTFactory collection = new NFTFactory( _name, _symbol, _cid, _price);
    listCollection.push(Collection(address(collection), msg.sender, _name, _price));
    mapCollectionByOwner[msg.sender].push(listCollection.length-1);
  }

  function mintCollectionItem(uint _collectionID, uint _tokenId) public payable returns (uint) {
    NFTFactory nftCollection = NFTFactory(listCollection[_collectionID].contractAddress);
    return nftCollection.mint{value: msg.value}(_tokenId, msg.sender);
  }

  function getCollectionArray() external view returns(Collection[] memory){
    return listCollection;
  }

  function getCollectionById(uint _collectionID) public view returns (Collection memory) {
    return listCollection[_collectionID];
  }

  function getCollectionItem(uint _collectionID, uint _tokenId) public view returns (string memory) {
    NFTFactory nftCollection = NFTFactory(listCollection[_collectionID].contractAddress);
    return nftCollection.getTokenURI(_tokenId);
  }

  function getCollectionMetadaURI(uint _collectionID)public view returns (string memory) {
    NFTFactory nftCollection = NFTFactory(listCollection[_collectionID].contractAddress);
    return nftCollection.getMetadataURI();
  }

  function getMyNFTsIds(uint _collectionID) external view returns(uint[] memory){
      NFTFactory nftCollection = NFTFactory(listCollection[_collectionID].contractAddress);
      return nftCollection.getTokenByAddress(msg.sender);
  }
      

  function isNFTMinted(uint _collectionID, uint _tokenId) public view returns (bool) {
    NFTFactory nftCollection = NFTFactory(listCollection[_collectionID].contractAddress);
    return nftCollection.isMinted(_tokenId);
  }

}
