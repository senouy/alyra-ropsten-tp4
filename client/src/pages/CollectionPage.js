import React, { Component } from "react";
import { Link } from "react-router-dom";

class CollectionPage extends Component {
  render() {
    const renderCollections = () => {
      if (this.props.listCollections.length > 0) {
        return (
          <div>
            {this.props.listCollections.map((collection, index) => (
              <Link
                to={"/collection?collectionID=" + (parseInt(index) + 1)}
                class="three-columns-container text-center container-collection-item"
                data-contract-address={collection.contractAddress}
              >
                <span class="collection-item">{collection.name}</span>
              </Link>
            ))}
          </div>
        );
      }
      return (
        <div>
          <em>Aucune collection existante sur la plateforme </em>
        </div>
      );
    };

    return (
      <div>
        <h2 class="text-center">Liste des collections</h2>
        <div class="main-container">
          {renderCollections()}
          <Link to={"/ajoutcollection"} class="button add-collection-button">
            + Ajouter une collection
          </Link>
        </div>
      </div>
    );
  }
}

export default CollectionPage;
