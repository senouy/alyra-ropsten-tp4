import React, { Component } from "react";
import NFTItem from "../components/NFTItem.js";
import { Link } from "react-router-dom";
import queryString from "query-string";

class CollectionDetailsPage extends Component {
  componentDidMount() {
    const params = queryString.parse(window.location.search);
    this.props.updateCollection(parseInt(params.collectionID) - 1);
    console.log("Do something with it", params.collectionID);
  }

  render() {
    return (
      <div>
        <h2 class="text-center">
          NFTs de la collection {this.props.currentCollection.name}
        </h2>
        <div class="main-container">
          {this.props.listItemNFT.map((nft) => (
            <div class="three-columns-container text-center">
              <Link to={"/nft?nftID=" + nft.edition}>
                <NFTItem
                  isOwner={false}
                  collectionID={this.props.currentCollectionID}
                  nft={nft}
                  nftPrice={this.props.currentCollection.nftPrice}
                  mintNFT={this.props.mintNFT}
                  updateNFT={this.props.updateNFT}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CollectionDetailsPage;
