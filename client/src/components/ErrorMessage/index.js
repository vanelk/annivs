import React from 'react';
import propTypes from 'prop-types';
import './style.scss';
function ErrorMessage({className, ...rest}) {
    return (
        <div className={["error-box", className].join(" ")} {...rest}/>  
    )
}
ErrorMessage.propTypes ={
    className: propTypes.string
}
export default ErrorMessage;