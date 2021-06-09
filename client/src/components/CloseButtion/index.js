import React from 'react';
import propTypes from 'prop-types';
import './style.scss';

function CloseButton({onClick}) {
    return (
        <button className="close-button">
            <span onClick={onClick} className="icon-close-square" />
        </button>
    )
}
CloseButton.propTypes = {
    onClick: propTypes.func
}
export default CloseButton;