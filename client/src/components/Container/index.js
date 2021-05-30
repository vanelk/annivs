import React from 'react';
import propTypes from 'prop-types';
import './style.scss';
function Container({variant, className, ...rest}) {
    return (
        <div className={["container", className, variant].join(" ")} {...rest}/>
    )
}
Container.propTypes = {
    variant: propTypes.oneOf([
        'fluid',
        'normal'
    ]),
    className: propTypes.string
}
export default  Container;