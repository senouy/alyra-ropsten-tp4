import React from "react";

export default class Header extends React.Component {
    render(){
        const renderHeader = () => {
            if (this.props.addr === null) {
              return <div>
                        <h1>OpenSky</h1>
                        Veuillez connecter votre wallet    
                    </div>;
            } 
            return <div>
                        <h1>OpenSky</h1>
                            Mon adresse <span style={{fontWeight:'bold'}}>{this.props.addr}</span>                        
                    </div>;
        }

        return( <header className="header">
                    {renderHeader()}
                    <div id="toast-message" className="hide">
                        Error
                    </div>
                </header>
        )
    }
}