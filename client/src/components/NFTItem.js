import React from "react";

export default class NFTItem extends React.Component {
    render(){
        const renderButton = () => {
            if (this.props.nft.isMinted === true) {
              return ;
            } 
            return <button onClick={this.props.mintNFT} data-collection-id={this.props.collectionID} data-token-id={this.props.nft.edition} data-nft-price={this.props.nftPrice} >
                        Mint  
                    </button>;
        }

        const renderPrice = () => {
            if (this.props.nft.isMinted === true) {
              return ;
            } 
            return <span class="nft-price">
                        {this.props.nftPrice/1000000000000000000} Eth 
                    </span>;
        }

        return( 
                <div class="container-nft-item" style={{backgroundImage: 'url(https://ipfs.io/ipfs/' + this.props.nft.image.substring(6) + ')'}} >
                    <span class="nft-item">{this.props.nft.name}</span>
                    {renderButton()}
                    {renderPrice()}
                </div> 
        )
    }
}