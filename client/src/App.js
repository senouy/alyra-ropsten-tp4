import React, { Component } from "react";



import * as CONSTANTS from "./constants";
import PlatformOpenSkyContract from "./contracts/PlatformOpenSky.json";
import getWeb3 from "./getWeb3";

import Header from "./components/Header.js";
import NFTItem from "./components/NFTItem.js";
import NFTDetails from "./components/NFTDetails.js";  

import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, contract: null, addresses: null, owner: null,
            listCollections : [], listItemNFT : [], listMyNFT : []
          };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3(this);

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = PlatformOpenSkyContract.networks[networkId];
      const contract = new web3.eth.Contract(
        PlatformOpenSkyContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      let listCollections = await contract.methods.getCollectionArray().call();

      console.log(listCollections);

      let listItemNFT = [];
      let listMyNFT = [];

      if(listCollections.length > 0){
        let metadata = await contract.methods.getCollectionMetadaURI(0).call();
        //console.log(metadata);

        let response_metada = await fetch(metadata);
        listItemNFT = await response_metada.json();

        await Promise.all(listItemNFT.map(async (nft) => {
          let response = await contract.methods.isNFTMinted(0,nft.edition).call();
          nft.isMinted = response;
        }));

        let listMyNFTIDs = await contract.methods.getMyNFTsIds(0).call({from: accounts[0]});
        
        await Promise.all(listMyNFTIDs.map(async (nftID) => {
          let metadata = await contract.methods.getCollectionItem(0,nftID).call();
          console.log(metadata);
          let response_metada = await fetch(metadata);
          let itemNFT = await response_metada.json();
          listMyNFT.push(itemNFT);
        }));
        
        console.log(listMyNFT);
      }
      //console.log(listItemNFT);
      
      
      //let owner = await contract.methods.owner().call();

      this.setState({ web3, accounts, contract, listCollections, listItemNFT, listMyNFT});
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      this.displayMessage(
        `Failed to load web3, accounts, or contract. Check console for details.`, CONSTANTS.TOAST_MESSAGE_TYPE.ERROR
      );
      console.error(error);
      //this.openMetamask();
    }
  };

  updateAccount = async () => {
    const accounts = await this.state.web3.eth.getAccounts();
    const userRole = this.getRole(accounts[0], this.state.owner, this.state.listVoterAddress);
    
    this.setState({accounts, userRole});
    this.displayMessage("Votre compte metamask a été mis à jour", CONSTANTS.TOAST_MESSAGE_TYPE.INFO); 
  }

  displayMessage(message, messageTypeClassName){
    document.getElementById("toast-message").innerHTML = message;
    document.getElementById("toast-message").removeAttribute('class');
    document.getElementById("toast-message").classList.add(messageTypeClassName);

    setTimeout(() => {
      document.getElementById("toast-message").classList.add('hide');
    }, 10000);
  }

  createCollection = async () => {
    const {accounts, contract, web3} = this.state;

    const collectionNameValue = document.getElementById("collection_name_value").value;
    const collectionSymbolValue = document.getElementById("collection_symbol_value").value;
    const nftPriceValue = web3.utils.toWei(document.getElementById("nft_price_value").value, 'ether');
    const collectionMetadataValue = document.getElementById("collection_cid_metadata_value").value;

    try {

      await contract.methods.createCollection(collectionNameValue, collectionSymbolValue, collectionMetadataValue, nftPriceValue).send({from: accounts[0]});

      //clear input
      document.getElementById("collection_name_value").value = '';
      document.getElementById("collection_symbol_value").value = '';
      document.getElementById("nft_price_value").value = '';
      document.getElementById("collection_cid_metadata_value").value = '';
    } catch (error) {
      this.displayMessage('Une erreur est survenue', CONSTANTS.TOAST_MESSAGE_TYPE.ERROR);
      console.error(error);
    }  

  }

  mintNFT = async (e) => {
    const {accounts, contract} = this.state;

    try {

        const collectionID = e.target.getAttribute("data-collection-id");
        const tokenID = e.target.getAttribute("data-token-id");
        const nftPrice = parseInt(e.target.getAttribute("data-nft-price"));

        await contract.methods.mintCollectionItem(collectionID, tokenID).send({from: accounts[0], value : nftPrice});
  
    } catch (error) {
      this.displayMessage('Une erreur est survenue', CONSTANTS.TOAST_MESSAGE_TYPE.ERROR);
      console.error(error);
    }
    
  }


  render() {
    if (!this.state.web3) {
      return  <div className="App">
                <Header addr={this.state.accounts} />
              </div>
    }
    return (
      <div className="App">
        <Header addr={this.state.accounts} />

        <h2 class="text-center">Action</h2>
        <div class="main-container">
            
            <div>
                  <input type="text" id="collection_name_value" placeholder="Nom de la collection" />
                  <input type="text" id="collection_symbol_value" placeholder="Symbole de la collection" />
                  <input type="text" id="nft_price_value" placeholder="Prix d'un NFT (en Ether)" />
                  <input type="text" id="collection_cid_metadata_value" placeholder="CID metadata" />
                  <button onClick={this.createCollection}>Créer une collection</button>
              </div>
        </div>

        <h2 class="text-center">Liste des collections</h2>
        <div class="main-container">
          
          {this.state.listCollections.map( (collection) => (
              <div class="three-columns-container text-center container-collection-item" data-contract-address={collection.contractAddress}>
                  <span class="collection-item">{collection.name}</span>
                  
              </div>
            ))}
        </div>
        
        <div class="clearfix"></div>

        <h2 class="text-center">Liste des NFTs</h2>
        <div class="main-container">
          
          {this.state.listItemNFT.map( (nft) => (
              <div class="three-columns-container text-center" >
                <NFTItem isOwner={false} collectionID={0} nft={nft} nftPrice={this.state.listCollections[0].nftPrice} mintNFT={this.mintNFT} />
                 
              </div>
            ))}
        </div>

        <div class="clearfix"></div>

        <div>
          <h2 class="text-center">Details d'un NFT</h2>
          <NFTDetails collectionID={0}  nft={this.state.listItemNFT[10]} nftPrice={this.state.listCollections[0].nftPrice} mintNFT={this.mintNFT} />
        </div>

        <div class="clearfix"></div>

        <h2 class="text-center">Ma collection</h2>
        
        {this.state.listMyNFT.map( (nft) => (
            <div class="three-columns-container text-center" >
              <NFTItem isOwner={true} collectionID={0} nft={nft} nftPrice={this.state.listCollections[0].nftPrice} mintNFT={this.mintNFT} />
                
            </div>
          ))}
      </div>
    );
  }
}

export default App;
