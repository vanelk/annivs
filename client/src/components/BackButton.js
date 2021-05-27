import React from 'react';
import {useHistory, useLocation} from  'react-router-dom';
var back;
function BackButton() {
    const history = useHistory();
    const { state } = useLocation();
    back = () => {
        if(state?.from){
            history.goBack();
        } else {
            history.push("/app");
        }
    }
    return (
        <button onClick={back} className="back-btn">
            <span className="icon-arrow-circle-left"></span>  
        </button>
    )
}

export {BackButton as default, back}