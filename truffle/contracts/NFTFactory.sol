// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

//import Open Zepplin contracts

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract NFTFactory is Ownable, ERC721 {
    uint256 private _tokenIds;
    uint256 price;
    uint256 total;

    string cid;

    mapping(address => uint256[]) _tokensByAddress;
    mapping(uint256 => address) _addressByToken;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _cid,
        uint256 _price
    ) ERC721(_name, _symbol) {
        cid = _cid;
        price = _price;
    }

    function totalSupply() public view returns (uint256) {
        return total;
    }

    /// @dev mint a token using _mint Openzeppelin function
    /// @dev need address origin to attribute the NFT to user account instead of contract caller account
    function mint(uint256 _tokenId, address _origin)
        public
        payable
        returns (uint256)
    {
        require(
            msg.value >= price,
            string.concat(
                "Not the good price - ",
                Strings.toString(msg.value),
                (" - "),
                Strings.toString(price)
            )
        );
        require(totalSupply() + _tokenId <= 30, "Max supply exceeded");

        _mint(_origin, _tokenId);
        _tokensByAddress[_origin].push(_tokenId);
        return _tokenId;
    }

    /// @dev check if a token is already minted
    function isMinted(uint256 _tokenId) public view returns (bool) {
        return _exists(_tokenId);
    }

    /// @dev get token metadata using pinata and collection's CID
    function getTokenMetadataURI(uint256 _tokenId)
        public
        view
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    string.concat(
                        "https://gateway.pinata.cloud/ipfs/",
                        cid,
                        "/"
                    ),
                    Strings.toString(_tokenId),
                    ".json"
                )
            );
    }

    /// @dev get collection metadata using pinata and collection's CID
    function getCollectionMetadataURI() public view returns (string memory) {
        return
            string(
                abi.encodePacked(
                    string.concat(
                        "https://gateway.pinata.cloud/ipfs/",
                        cid,
                        "/_metadata.json"
                    )
                )
            );
    }

    /// @dev get all tokens owned by a specific address
    function getTokenByAddress(address _address)
        external
        view
        returns (uint256[] memory)
    {
        return _tokensByAddress[_address];
    }

    function withdraw() public view onlyOwner {
        msg.sender.call{value: address(this).balance};
    }
}
