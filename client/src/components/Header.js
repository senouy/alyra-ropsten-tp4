import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    const renderHeader = () => {
      if (this.props.addr === null) {
        return (
          <div>
            <h1>OpenSky</h1>
            Veuillez connecter votre wallet
          </div>
        );
      }
      return (
        <div>
          <h1 class="logo">OpenSky</h1>
          <span class="link">
            <Link to={"/"}>Collection</Link>
          </span>
          <span class="link">
            <Link to={"/mynft"}>Mes NFT</Link>
          </span>
          <span style={{ fontWeight: "bold" }}>{this.props.addr}</span>
        </div>
      );
    };

    return (
      <header className="header">
        {renderHeader()}
        <div id="toast-message" className="hide">
          Error
        </div>
      </header>
    );
  }
}
