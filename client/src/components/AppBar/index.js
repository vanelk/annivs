import React from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import './style.scss';
function AppBar({ title }) {
    const history = useHistory();
    const goTo = (link)=>history.push(link);
    return (
        <nav className="app-bar">
            <h3 className="app-bar__title">{title}</h3>
            <div className="app-bar__icon-container">
                <button aria-label="settings" className="app-bar__btn" onClick={()=>goTo("/app/settings")}>
                    <span className="app-bar__icon icon-setting" />
                </button>
                <button aria-label="search" className="app-bar__btn" onClick={()=>goTo("/app/search")}>
                    <span className="app-bar__icon icon-search" />
                </button>
            </div>
        </nav>
    )
}
AppBar.propTypes = {
    title: propTypes.string
}
export default AppBar;