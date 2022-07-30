import React, { Component } from "react";
import * as CONSTANTS from "./constants";
import PlatformOpenSkyContract from "./contracts/PlatformOpenSky.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, contract: null, addresses: null, owner: null};

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
      
      
      //let owner = await contract.methods.owner().call();

      this.setState({ web3, accounts, contract});
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      this.displayMessage(
        `Failed to load web3, accounts, or contract. Check console for details.`, CONSTANTS.TOAST_MESSAGE_TYPE.ERROR
      );
      console.error(error);
      this.openMetamask();
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


  render() {
    if (!this.state.web3) {
      return  <div className="App">
                <div id="toast-message" className="hide">
                        Error
                    </div>
                Veuillez vous connecter
              </div>
    }
    return (
      <div className="App">
          <div id="toast-message" className="hide">
                        Error
                    </div>
        Dapp en construction
      </div>
    );
  }
}

export default App;
