# TP4 - OpenSky

## _Concurrent de OpenSea_

[![N|Solid](https://alyra.fr/wp-content/uploads/2019/06/logo-titre-alyra-bleu-transparent-64px_v3.png)](https://github.com/senouy/alyra-ropsten-tp4)

## Démo de la Dapp

https://www.loom.com/share/29a96f8bffde4c6b9d133339ea725275

## Dapp déployée sur le cloud

Le front est déployé sur github à l'adresse : https://senouy.github.io/alyra-ropsten-tp4

Le back est déployé sur le réseau ropsten via la commande :

```sh
truffle migrate --network ropsten
```

## Installation

Cloner le projet depuis le repository public https://github.com/senouy/alyra-ropsten-tp4

### Installation React

Installer et lancer le projet react en local

```sh
cd alyra-ropsten-tp4/clients
npm install
npm run start
```

### Installation Truffle

Lancer ganache depuis un autre terminal

```sh
ganache
```

Déployer le smart contract en local

```sh
cd ../truflle
truffle migrate
```

## Couverture de test

### 1. Tests sur les collections

- Scénarios testés
  - Création d'une collection et vérification que les infos saisies sont bien celles enregistrées dans la blockchain

### 2. Tests sur les NFT

- Scénarios testés
  - Récupération des metadatas d'un NFT
  - Mint d'un NFT
  - Vérification qu'un NFT minté appartient bien au minter

## Documentation

```sh
solc --userdoc --devdoc contracts/PlatformOpenSky.sol
```

======= contracts/NFTFactory.sol:NFTFactory =======
Developer Documentation
{"kind":"dev","methods":{"approve(address,uint256)":{"details":"See {IERC721-approve}."},"balanceOf(address)":{"details":"See {IERC721-balanceOf}."},"getApproved(uint256)":{"details":"See {IERC721-getApproved}."},"getCollectionMetadataURI()":{"details":"get collection metadata using pinata and collection's CID"},"getTokenByAddress(address)":{"details":"get all tokens owned by a specific address"},"getTokenMetadataURI(uint256)":{"details":"get token metadata using pinata and collection's CID"},"isApprovedForAll(address,address)":{"details":"See {IERC721-isApprovedForAll}."},"isMinted(uint256)":{"details":"check if a token is already minted"},"mint(uint256,address)":{"details":"mint a token using \_mint Openzeppelin functionneed address origin to attribute the NFT to user account instead of contract caller account"},"name()":{"details":"See {IERC721Metadata-name}."},"owner()":{"details":"Returns the address of the current owner."},"ownerOf(uint256)":{"details":"See {IERC721-ownerOf}."},"renounceOwnership()":{"details":"Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner."},"safeTransferFrom(address,address,uint256)":{"details":"See {IERC721-safeTransferFrom}."},"safeTransferFrom(address,address,uint256,bytes)":{"details":"See {IERC721-safeTransferFrom}."},"setApprovalForAll(address,bool)":{"details":"See {IERC721-setApprovalForAll}."},"supportsInterface(bytes4)":{"details":"See {IERC165-supportsInterface}."},"symbol()":{"details":"See {IERC721Metadata-symbol}."},"tokenURI(uint256)":{"details":"See {IERC721Metadata-tokenURI}."},"transferFrom(address,address,uint256)":{"details":"See {IERC721-transferFrom}."},"transferOwnership(address)":{"details":"Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner."}},"version":1}
User Documentation
{"kind":"user","methods":{},"version":1}

======= contracts/PlatformOpenSky.sol:PlatformOpenSky =======
Developer Documentation
{"kind":"dev","methods":{},"version":1}
User Documentation
{"kind":"user","methods":{},"version":1}

======= node_modules/@openzeppelin/contracts/access/Ownable.sol:Ownable =======
Developer Documentation
{"details":"Contract module which provides a basic access control mechanism, where there is an account (an owner) that can be granted exclusive access to specific functions. By default, the owner account will be the one that deploys the contract. This can later be changed with {transferOwnership}. This module is used through inheritance. It will make available the modifier `onlyOwner`, which can be applied to your functions to restrict their use to the owner.","kind":"dev","methods":{"constructor":{"details":"Initializes the contract setting the deployer as the initial owner."},"owner()":{"details":"Returns the address of the current owner."},"renounceOwnership()":{"details":"Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner."},"transferOwnership(address)":{"details":"Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner."}},"version":1}
User Documentation
{"kind":"user","methods":{},"version":1}

======= node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol:ERC721 =======
Developer Documentation
{"details":"Implementation of https://eips.ethereum.org/EIPS/eip-721[ERC721] Non-Fungible Token Standard, including the Metadata extension, but not including the Enumerable extension, which is available separately as {ERC721Enumerable}.","kind":"dev","methods":{"approve(address,uint256)":{"details":"See {IERC721-approve}."},"balanceOf(address)":{"details":"See {IERC721-balanceOf}."},"constructor":{"details":"Initializes the contract by setting a `name` and a `symbol` to the token collection."},"getApproved(uint256)":{"details":"See {IERC721-getApproved}."},"isApprovedForAll(address,address)":{"details":"See {IERC721-isApprovedForAll}."},"name()":{"details":"See {IERC721Metadata-name}."},"ownerOf(uint256)":{"details":"See {IERC721-ownerOf}."},"safeTransferFrom(address,address,uint256)":{"details":"See {IERC721-safeTransferFrom}."},"safeTransferFrom(address,address,uint256,bytes)":{"details":"See {IERC721-safeTransferFrom}."},"setApprovalForAll(address,bool)":{"details":"See {IERC721-setApprovalForAll}."},"supportsInterface(bytes4)":{"details":"See {IERC165-supportsInterface}."},"symbol()":{"details":"See {IERC721Metadata-symbol}."},"tokenURI(uint256)":{"details":"See {IERC721Metadata-tokenURI}."},"transferFrom(address,address,uint256)":{"details":"See {IERC721-transferFrom}."}},"version":1}
User Documentation
{"kind":"user","methods":{},"version":1}

======= node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol:IERC721 =======
Developer Documentation
{"details":"Required interface of an ERC721 compliant contract.","events":{"Approval(address,address,uint256)":{"details":"Emitted when `owner` enables `approved` to manage the `tokenId` token."},"ApprovalForAll(address,address,bool)":{"details":"Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets."},"Transfer(address,address,uint256)":{"details":"Emitted when `tokenId` token is transferred from `from` to `to`."}},"kind":"dev","methods":{"approve(address,uint256)":{"details":"Gives permission to `to` to transfer `tokenId` token to another account. The approval is cleared when the token is transferred. Only a single account can be approved at a time, so approving the zero address clears previous approvals. Requirements: - The caller must own the token or be an approved operator. - `tokenId` must exist. Emits an {Approval} event."},"balanceOf(address)":{"details":"Returns the number of tokens in `owner`'s account."},"getApproved(uint256)":{"details":"Returns the account approved for `tokenId` token. Requirements: - `tokenId` must exist."},"isApprovedForAll(address,address)":{"details":"Returns if the `operator` is allowed to manage all of the assets of `owner`. See {setApprovalForAll}"},"ownerOf(uint256)":{"details":"Returns the owner of the `tokenId` token. Requirements: - `tokenId` must exist."},"safeTransferFrom(address,address,uint256)":{"details":"Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients are aware of the ERC721 protocol to prevent tokens from being forever locked. Requirements: - `from` cannot be the zero address. - `to` cannot be the zero address. - `tokenId` token must exist and be owned by `from`. - If the caller is not `from`, it must have been allowed to move this token by either {approve} or {setApprovalForAll}. - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer. Emits a {Transfer} event."},"safeTransferFrom(address,address,uint256,bytes)":{"details":"Safely transfers `tokenId` token from `from` to `to`. Requirements: - `from` cannot be the zero address. - `to` cannot be the zero address. - `tokenId` token must exist and be owned by `from`. - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}. - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer. Emits a {Transfer} event."},"setApprovalForAll(address,bool)":{"details":"Approve or remove `operator` as an operator for the caller. Operators can call {transferFrom} or {safeTransferFrom} for any token owned by the caller. Requirements: - The `operator` cannot be the caller. Emits an {ApprovalForAll} event."},"supportsInterface(bytes4)":{"details":"Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section] to learn more about how these ids are created. This function call must use less than 30 000 gas."},"transferFrom(address,address,uint256)":{"details":"Transfers `tokenId` token from `from` to `to`. WARNING: Usage of this method is discouraged, use {safeTransferFrom} whenever possible. Requirements: - `from` cannot be the zero address. - `to` cannot be the zero address. - `tokenId` token must be owned by `from`. - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}. Emits a {Transfer} event."}},"version":1}
User Documentation
{"kind":"user","methods":{},"version":1}

======= node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol:IERC721Receiver =======
Developer Documentation
{"details":"Interface for any contract that wants to support safeTransfers from ERC721 asset contracts.","kind":"dev","methods":{"onERC721Received(address,address,uint256,bytes)":{"details":"Whenever an {IERC721} `tokenId` token is transferred to this contract via {IERC721-safeTransferFrom} by `operator` from `from`, this function is called. It must return its Solidity selector to confirm the token transfer. If any other value is returned or the interface is not implemented by the recipient, the transfer will be reverted. The selector can be obtained in Solidity with `IERC721Receiver.onERC721Received.selector`."}},"title":"ERC721 token receiver interface","version":1}
User Documentation
{"kind":"user","methods":{},"version":1}

======= node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol:IERC721Metadata =======
Developer Documentation
{"details":"See https://eips.ethereum.org/EIPS/eip-721","kind":"dev","methods":{"approve(address,uint256)":{"details":"Gives permission to `to` to transfer `tokenId` token to another account. The approval is cleared when the token is transferred. Only a single account can be approved at a time, so approving the zero address clears previous approvals. Requirements: - The caller must own the token or be an approved operator. - `tokenId` must exist. Emits an {Approval} event."},"balanceOf(address)":{"details":"Returns the number of tokens in `owner`'s account."},"getApproved(uint256)":{"details":"Returns the account approved for `tokenId` token. Requirements: - `tokenId` must exist."},"isApprovedForAll(address,address)":{"details":"Returns if the `operator` is allowed to manage all of the assets of `owner`. See {setApprovalForAll}"},"name()":{"details":"Returns the token collection name."},"ownerOf(uint256)":{"details":"Returns the owner of the `tokenId` token. Requirements: - `tokenId` must exist."},"safeTransferFrom(address,address,uint256)":{"details":"Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients are aware of the ERC721 protocol to prevent tokens from being forever locked. Requirements: - `from` cannot be the zero address. - `to` cannot be the zero address. - `tokenId` token must exist and be owned by `from`. - If the caller is not `from`, it must have been allowed to move this token by either {approve} or {setApprovalForAll}. - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer. Emits a {Transfer} event."},"safeTransferFrom(address,address,uint256,bytes)":{"details":"Safely transfers `tokenId` token from `from` to `to`. Requirements: - `from` cannot be the zero address. - `to` cannot be the zero address. - `tokenId` token must exist and be owned by `from`. - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}. - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer. Emits a {Transfer} event."},"setApprovalForAll(address,bool)":{"details":"Approve or remove `operator` as an operator for the caller. Operators can call {transferFrom} or {safeTransferFrom} for any token owned by the caller. Requirements: - The `operator` cannot be the caller. Emits an {ApprovalForAll} event."},"supportsInterface(bytes4)":{"details":"Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section] to learn more about how these ids are created. This function call must use less than 30 000 gas."},"symbol()":{"details":"Returns the token collection symbol."},"tokenURI(uint256)":{"details":"Returns the Uniform Resource Identifier (URI) for `tokenId` token."},"transferFrom(address,address,uint256)":{"details":"Transfers `tokenId` token from `from` to `to`. WARNING: Usage of this method is discouraged, use {safeTransferFrom} whenever possible. Requirements: - `from` cannot be the zero address. - `to` cannot be the zero address. - `tokenId` token must be owned by `from`. - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}. Emits a {Transfer} event."}},"title":"ERC-721 Non-Fungible Token Standard, optional metadata extension","version":1}
User Documentation
{"kind":"user","methods":{},"version":1}

======= node_modules/@openzeppelin/contracts/utils/Address.sol:Address =======
Developer Documentation
{"details":"Collection of functions related to the address type","kind":"dev","methods":{},"version":1}
User Documentation
{"kind":"user","methods":{},"version":1}

======= node_modules/@openzeppelin/contracts/utils/Context.sol:Context =======
Developer Documentation
{"details":"Provides information about the current execution context, including the sender of the transaction and its data. While these are generally available via msg.sender and msg.data, they should not be accessed in such a direct manner, since when dealing with meta-transactions the account sending and paying for execution may not be the actual sender (as far as an application is concerned). This contract is only required for intermediate, library-like contracts.","kind":"dev","methods":{},"version":1}
User Documentation
{"kind":"user","methods":{},"version":1}

======= node_modules/@openzeppelin/contracts/utils/Strings.sol:Strings =======
Developer Documentation
{"details":"String operations.","kind":"dev","methods":{},"version":1}
User Documentation
{"kind":"user","methods":{},"version":1}

======= node_modules/@openzeppelin/contracts/utils/introspection/ERC165.sol:ERC165 =======
Developer Documentation
{"details":"Implementation of the {IERC165} interface. Contracts that want to implement ERC165 should inherit from this contract and override {supportsInterface} to check for the additional interface id that will be supported. For example: `solidity function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) { return interfaceId == type(MyInterface).interfaceId || super.supportsInterface(interfaceId); } ` Alternatively, {ERC165Storage} provides an easier to use but more expensive implementation.","kind":"dev","methods":{"supportsInterface(bytes4)":{"details":"See {IERC165-supportsInterface}."}},"version":1}
User Documentation
{"kind":"user","methods":{},"version":1}

======= node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol:IERC165 =======
Developer Documentation
{"details":"Interface of the ERC165 standard, as defined in the https://eips.ethereum.org/EIPS/eip-165[EIP]. Implementers can declare support of contract interfaces, which can then be queried by others ({ERC165Checker}). For an implementation, see {ERC165}.","kind":"dev","methods":{"supportsInterface(bytes4)":{"details":"Returns true if this contract implements the interface defined by `interfaceId`. See the corresponding https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section] to learn more about how these ids are created. This function call must use less than 30 000 gas."}},"version":1}
User Documentation
{"kind":"user","methods":{},"version":1}
