import React, { Component } from "react";

import NFTItem from "../components/NFTItem.js";

class MyNFTsPage extends Component {
  render() {
    return (
      <div>
        <h2 class="text-center">Ma collection</h2>

        {this.props.listMyNFT.map((nft) => (
          <div class="three-columns-container text-center">
            <NFTItem
              isOwner={true}
              collectionID={0}
              nft={nft}
              nftPrice={this.props.currentCollection.nftPrice}
              mintNFT={this.mintNFT}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default MyNFTsPage;
