import React from 'react';
import propTypes from 'prop-types';
import './style.scss';
function ErrorMessage({children}) {
    return (
        <div className="error-box" >
            {children}
        </div>
    )
}
ErrorMessage.propTypes = {
    children: propTypes.any
}
export default ErrorMessage;