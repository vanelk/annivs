import React from 'react';
import propTypes from 'prop-types';
import './style.scss';
function Paper({className, ...rest}) {
    return (
        <div className={["paper", className].join(" ")} {...rest}/>
    )
}

Paper.propTypes = {
    className: propTypes.string
}
export default Paper;