import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as CONSTANTS from "./constants";
import PlatformOpenSkyContract from "./contracts/PlatformOpenSky.json";
import getWeb3 from "./getWeb3";

import CollectionPage from "./pages/CollectionPage.js";
import CreateCollectionPage from "./pages/CreateCollectionPage.js";
import CollectionDetailsPage from "./pages/CollectionDetailsPage.js";
import NFTDetailsPage from "./pages/NFTDetailsPage.js";
import MyNFTsPage from "./pages/MyNFTsPage.js";

import Header from "./components/Header.js";

import "./App.css";

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    addresses: null,
    owner: null,
    listCollections: [],
    listItemNFT: [],
    listMyNFT: [],
    currentCollectionID: null,
    currentCollection: null,
    currentNFT: null,
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
        deployedNetwork && deployedNetwork.address
      );

      let listCollections = await contract.methods.getCollectionArray().call();
      let currentCollection = 90;
      console.log(listCollections);

      let listItemNFT = [];
      let listMyNFT = [];

      if (listCollections.length > 0) {
        let metadata = await contract.methods.getCollectionMetadaURI(0).call();
        //console.log(metadata);

        let response_metada = await fetch(metadata);
        listItemNFT = await response_metada.json();

        await Promise.all(
          listItemNFT.map(async (nft) => {
            let response = await contract.methods
              .isNFTMinted(0, nft.edition)
              .call();
            nft.isMinted = response;
          })
        );

        let listMyNFTIDs = await contract.methods
          .getMyNFTsIds(0)
          .call({ from: accounts[0] });

        await Promise.all(
          listMyNFTIDs.map(async (nftID) => {
            let metadata = await contract.methods
              .getCollectionItem(0, nftID)
              .call();
            console.log(metadata);
            let response_metada = await fetch(metadata);
            let itemNFT = await response_metada.json();
            listMyNFT.push(itemNFT);
          })
        );

        console.log(listMyNFT);

        currentCollection = listCollections[0];
      }
      //console.log(listItemNFT);

      //let owner = await contract.methods.owner().call();

      this.setState({
        web3,
        accounts,
        contract,
        listCollections,
        listItemNFT,
        listMyNFT,
        currentCollection,
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      this.displayMessage(
        `Failed to load web3, accounts, or contract. Check console for details.`,
        CONSTANTS.TOAST_MESSAGE_TYPE.ERROR
      );
      console.error(error);
      //this.openMetamask();
    }
  };

  updateCollection = async (collectionID, listItemNFT) => {
    const { contract, listCollections } = this.state;

    try {
      let metadata = await contract.methods
        .getCollectionMetadaURI(collectionID)
        .call();

      let response_metada = await fetch(metadata);
      let listItemNFT = await response_metada.json();

      await Promise.all(
        listItemNFT.map(async (nft) => {
          let response = await contract.methods
            .isNFTMinted(collectionID, nft.edition)
            .call();
          nft.isMinted = response;
        })
      );

      let currentCollectionID = collectionID;
      let currentCollection = listCollections[collectionID];

      let currentNFT = listItemNFT[0];

      this.setState({
        listItemNFT,
        currentCollectionID,
        currentCollection,
        currentNFT,
      });
    } catch (error) {
      this.displayMessage(
        "Une erreur est survenue",
        CONSTANTS.TOAST_MESSAGE_TYPE.ERROR
      );
      console.error(error);
    }
  };

  updateNFT = async (nftID) => {
    const { listItemNFT } = this.state;

    let currentNFT = listItemNFT[parseInt(nftID) - 1];
    console.log(currentNFT);
    this.setState({
      currentNFT,
    });
  };

  updateAccount = async () => {
    const accounts = await this.state.web3.eth.getAccounts();
    const userRole = this.getRole(
      accounts[0],
      this.state.owner,
      this.state.listVoterAddress
    );

    this.setState({ accounts, userRole });
    this.displayMessage(
      "Votre compte metamask a été mis à jour",
      CONSTANTS.TOAST_MESSAGE_TYPE.INFO
    );
  };

  displayMessage(message, messageTypeClassName) {
    document.getElementById("toast-message").innerHTML = message;
    document.getElementById("toast-message").removeAttribute("class");
    document
      .getElementById("toast-message")
      .classList.add(messageTypeClassName);

    setTimeout(() => {
      document.getElementById("toast-message").classList.add("hide");
    }, 10000);
  }

  createCollection = async () => {
    const { accounts, contract, web3 } = this.state;

    const collectionNameValue = document.getElementById(
      "collection_name_value"
    ).value;
    const collectionSymbolValue = document.getElementById(
      "collection_symbol_value"
    ).value;
    const nftPriceValue = web3.utils.toWei(
      document.getElementById("nft_price_value").value,
      "ether"
    );
    const collectionMetadataValue = document.getElementById(
      "collection_cid_metadata_value"
    ).value;

    try {
      await contract.methods
        .createCollection(
          collectionNameValue,
          collectionSymbolValue,
          collectionMetadataValue,
          nftPriceValue
        )
        .send({ from: accounts[0] });

      //clear input
      document.getElementById("collection_name_value").value = "";
      document.getElementById("collection_symbol_value").value = "";
      document.getElementById("nft_price_value").value = "";
      document.getElementById("collection_cid_metadata_value").value = "";

      let listCollections = await contract.methods.getCollectionArray().call();
      this.setState({ listCollections });

      this.displayMessage(
        "La collection a bien été ajoutée",
        CONSTANTS.TOAST_MESSAGE_TYPE.SUCCESS
      );
    } catch (error) {
      this.displayMessage(
        "Une erreur est survenue",
        CONSTANTS.TOAST_MESSAGE_TYPE.ERROR
      );
      console.error(error);
    }
  };

  mintNFT = async (e) => {
    const { accounts, contract } = this.state;

    try {
      const collectionID = e.target.getAttribute("data-collection-id");
      const tokenID = e.target.getAttribute("data-token-id");
      const nftPrice = parseInt(e.target.getAttribute("data-nft-price"));

      await contract.methods
        .mintCollectionItem(collectionID, tokenID)
        .send({ from: accounts[0], value: nftPrice });
    } catch (error) {
      this.displayMessage(
        "Une erreur est survenue",
        CONSTANTS.TOAST_MESSAGE_TYPE.ERROR
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return (
        <div className="App">
          <Header addr={this.state.accounts} />
        </div>
      );
    }
    return (
      <Router>
        <div className="App">
          <Header addr={this.state.accounts} />

          <Routes>
            <Route
              path="/"
              element={
                <CollectionPage listCollections={this.state.listCollections} />
              }
            ></Route>
            <Route
              path="/ajoutcollection"
              element={
                <CreateCollectionPage
                  createCollection={this.createCollection}
                />
              }
            ></Route>
            <Route
              path="/collection"
              element={
                <CollectionDetailsPage
                  listItemNFT={this.state.listItemNFT}
                  currentCollectionID={this.state.currentCollectionID}
                  currentCollection={this.state.currentCollection}
                  mintNFT={this.mintNFT}
                  updateCollection={this.updateCollection}
                />
              }
            ></Route>
            <Route
              path="/nft"
              element={
                <NFTDetailsPage
                  nft={this.state.currentNFT}
                  currentCollectionID={this.state.currentCollectionID}
                  nftPrice={this.state.currentCollection.nftPrice}
                  mintNFT={this.mintNFT}
                  updateNFT={this.updateNFT}
                />
              }
            ></Route>
            <Route
              path="/mynft"
              element={
                <MyNFTsPage
                  listMyNFT={this.state.listMyNFT}
                  currentCollection={this.state.currentCollection}
                  mintNFT={this.mintNFT}
                />
              }
            ></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
