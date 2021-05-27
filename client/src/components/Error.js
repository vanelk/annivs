import React from 'react'
import { useHistory } from 'react-router';
import Button from './Button';
import errorimg from '../assets/images/pageError.png'
export default function Error({ error, action }) {
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
        <div className="text-center px-5">
            <div>
                <img alt="error" src={errorimg} className="mw-100" />
            </div>
            <h1>Uh oh!</h1>
            <p className="text-inactive">{error.split(".").map((sentence, i)=><span key={i}>{sentence}.</span>)}</p>
            <div className="mt-6">
                <Button onClick={func}>{btnText}</Button>
            </div>
        </div>
    )
}
