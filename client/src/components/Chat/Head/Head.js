import React from 'react';
import './Head.css';
import UseAutoSuggest from './../../../hooks/Autosuggest/index';

const Head = ({user}) => {
    return (
        <React.Fragment>
        <div className="head-section">
                <div className="headLeft-section">
                    <div className="headLeft-sub">
                        
                        <UseAutoSuggest user={user}/>
                    </div>
                </div>
                <div className="headRight-section">
                    <div className="headRight-sub-1 inline">

                    </div>
                    <div className="headRight-sub-2 inline">
                        
                    </div>
                    <br className="clearBoth"/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Head;
