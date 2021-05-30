import React from 'react';
import propTypes from 'prop-types';
import './style.scss';
function Loader({className, ...rest}) {
    return (
        <div className={["loader", className].join(" ")} {...rest}>
            <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle className="length" fill="none" strokeWidth="8" strokeLinecap="round" cx="33" cy="33" r="28"></circle>
            </svg>
            <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle fill="none" strokeWidth="8" strokeLinecap="round" cx="33" cy="33" r="28"></circle>
            </svg>
            <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle fill="none" strokeWidth="8" strokeLinecap="round" cx="33" cy="33" r="28"></circle>
            </svg>
            <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle fill="none" strokeWidth="8" strokeLinecap="round" cx="33" cy="33" r="28"></circle>
            </svg>
        </div>
    )
}

Loader.propTypes = {
    className: propTypes.string
}
export default Loader;