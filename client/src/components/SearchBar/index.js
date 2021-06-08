import React from 'react';
import './style.scss';
export default function SearchBar(props) {
    return (
        <label className="search-bar">
            <span className="icon-search"/>
            <input type="search" autoComplete="off" {...props}/>
        </label>
    )
}
