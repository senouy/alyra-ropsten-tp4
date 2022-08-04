import React from "react";

export default class NFTDetails extends React.Component {
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
            return <h4 class="nft-price">
                        Prix : {this.props.nftPrice/1000000000000000000} Eth 
                    </h4>;
        }

        return( 
                <div class="main-container container-nft-details" >
                    <div class="two-columns-container">
                        <img src={'https://ipfs.io/ipfs/' + this.props.nft.image.substring(6)}/>
                    </div>

                    <div class="two-columns-container">
                        <h1 class="nft-title">{this.props.nft.name}</h1>
                        <h3 class="nft-description">{this.props.nft.description}</h3>
                        <br/>
                        {renderPrice()}
                        {renderButton()}
                        <br/><br/>
                        <h5>Properties</h5>
                        {this.props.nft.attributes.map( (attribute) => (
                            <div class="nft-attribute">
                                <span class="ntf-attribute-type">{attribute.trait_type}</span>
                                <br/><br/>
                                <span class="ntf-attribute-value">{attribute.value}</span>
                            </div>
                        ))}
                        
                    </div>
                    
                </div> 
        )
    }
}