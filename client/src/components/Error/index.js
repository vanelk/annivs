import React from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router';
import Button from '../Button';
import errorimg from '../../assets/images/pageError.png';
import './style.scss';
function Error({ error, action }) {
    const history = useHistory() || window.history;
    let func = null, btnText = '';
    switch (action) {
        case 'home':
            func = () => history.push("/app");
            btnText = 'Go Home';
            break;
        case 'reload':
        default:
            func = () => history.go(0);
            btnText = 'Reload';
    }
    return (
        <div className="error-container">
            <div className="error-image">
                <img alt="error" src={errorimg} />
            </div>
            <h1 className="error-title">Uh oh!</h1>
            <p className="error-body">{error.split(".").map((sentence, i)=><span key={i}>{sentence}.</span>)}</p>
            <div className="btn-container">
                <Button onClick={func}>{btnText}</Button>
            </div>
        </div>
    )
}
Error.propTypes = {
    error: propTypes.string.isRequired,
    action: propTypes.oneOf(
        [
            'home',
            'reload'
        ]
    ).isRequired
}
export default Error;