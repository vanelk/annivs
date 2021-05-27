import React from 'react'
import Link from './Link';
export default function AppBar({ title }) {
    return (
        <div className="app-bar">
            <h3 className="app-bar__title">{title}</h3>
            <div className="app-bar__icon-container">
                <Link className="app-bar__link" to="/app/settings">
                    <span className="app-bar__icon icon-setting"/>
                </Link>
                <Link className="app-bar__link" to="/app/search">
                <span className="app-bar__icon icon-search"/>
                </Link>
            </div>
        </div>
    )
}
