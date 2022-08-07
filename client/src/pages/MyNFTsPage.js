import React, { Component } from "react";

import NFTItem from "../components/NFTItem.js";

class MyNFTsPage extends Component {
  render() {
    return (
      <div>
        <h2 class="text-center">Mes NFT</h2>

        {this.props.listMyNFT.map((nft) => (
          <div class="three-columns-container text-center">
            <NFTItem
              isOwner={true}
              nft={nft}
              nftPrice={this.props.currentCollection.nftPrice}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default MyNFTsPage;
