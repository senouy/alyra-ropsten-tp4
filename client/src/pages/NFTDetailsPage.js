import React, { Component } from "react";

import NFTDetails from "../components/NFTDetails.js";

class NFTDetailPage extends Component {
  render() {
    return (
      <div>
        <div>
          <h2 class="text-center">Details d'un NFT</h2>
          <NFTDetails
            collectionID={this.props.currentCollectionID}
            nft={this.props.nft}
            nftPrice={this.props.nftPrice}
            mintNFT={this.props.mintNFT}
            updateNFT={this.props.updateNFT}
          />
        </div>
      </div>
    );
  }
}

export default NFTDetailPage;
