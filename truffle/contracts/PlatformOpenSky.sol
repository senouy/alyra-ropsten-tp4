// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

/// @title Open Sky Dapp
/// @author Guillaume & Charles & Ghofrane
/// @notice You can use this contract only in a beta mode
/// @dev This contract hasn't been audited yet, please be carreful when using it

import "./NFTFactory.sol";

contract PlatformOpenSky {
    struct Collection {
        address contractAddress;
        address owner;
        string name;
        uint256 nftPrice;
    }

    Collection[] public listCollection;
    mapping(address => uint256[]) mapCollectionByOwner;

    function createCollection(
        string calldata _name,
        string calldata _symbol,
        string calldata _cid,
        uint256 _price
    ) external {
        NFTFactory collection = new NFTFactory(_name, _symbol, _cid, _price);
        listCollection.push(
            Collection(address(collection), msg.sender, _name, _price)
        );
        mapCollectionByOwner[msg.sender].push(listCollection.length - 1);
    }

    function mintCollectionItem(uint256 _collectionID, uint256 _tokenId)
        public
        payable
        returns (uint256)
    {
        NFTFactory nftCollection = NFTFactory(
            listCollection[_collectionID].contractAddress
        );
        return nftCollection.mint{value: msg.value}(_tokenId, msg.sender);
    }

    function getCollectionArray() external view returns (Collection[] memory) {
        return listCollection;
    }

    function getCollectionById(uint256 _collectionID)
        public
        view
        returns (Collection memory)
    {
        return listCollection[_collectionID];
    }

    function getCollectionItem(uint256 _collectionID, uint256 _tokenId)
        public
        view
        returns (string memory)
    {
        NFTFactory nftCollection = NFTFactory(
            listCollection[_collectionID].contractAddress
        );
        return nftCollection.getTokenMetadataURI(_tokenId);
    }

    function getCollectionMetadaURI(uint256 _collectionID)
        public
        view
        returns (string memory)
    {
        NFTFactory nftCollection = NFTFactory(
            listCollection[_collectionID].contractAddress
        );
        return nftCollection.getCollectionMetadataURI();
    }

    function getMyNFTsIds(uint256 _collectionID)
        external
        view
        returns (uint256[] memory)
    {
        NFTFactory nftCollection = NFTFactory(
            listCollection[_collectionID].contractAddress
        );
        return nftCollection.getTokenByAddress(msg.sender);
    }

    function getNFTOwner(uint256 _collectionID, uint256 _tokenId)
        public
        view
        returns (address)
    {
        NFTFactory nftCollection = NFTFactory(
            listCollection[_collectionID].contractAddress
        );
        return nftCollection.ownerOf(_tokenId);
    }

    function isNFTMinted(uint256 _collectionID, uint256 _tokenId)
        public
        view
        returns (bool)
    {
        NFTFactory nftCollection = NFTFactory(
            listCollection[_collectionID].contractAddress
        );
        return nftCollection.isMinted(_tokenId);
    }
}
