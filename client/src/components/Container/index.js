import React from 'react';
import propTypes from 'prop-types';
import './style.scss';
function Container({ variant, children }) {
    return (
        <div className={["container", variant].join(" ")} >
            {children}
        </div>
    )
}
Container.propTypes = {
    variant: propTypes.oneOf([
        'fluid',
        'normal'
    ]),
    children: propTypes.any
}
export default Container;