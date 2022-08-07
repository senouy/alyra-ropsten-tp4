import React, { Component } from "react";

class CreateCollectionPage extends Component {
  componentDidMount = async () => {
    console.log("hello world");
  };
  render() {
    return (
      <div>
        <h2 class="text-center">Action</h2>
        <div class="main-container">
          <div>
            <input
              type="text"
              id="collection_name_value"
              placeholder="Nom de la collection"
            />
            <input
              type="text"
              id="collection_symbol_value"
              placeholder="Symbole de la collection"
            />
            <input
              type="text"
              id="nft_price_value"
              placeholder="Prix d'un NFT (en Ether)"
            />
            <input
              type="text"
              id="collection_cid_metadata_value"
              placeholder="CID metadata"
            />
            <button onClick={this.props.createCollection}>
              Créer une collection
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCollectionPage;
