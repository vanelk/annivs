import React from 'react'

export default function SearchBar(props) {
    return (
        <label className="search-bar">
            <span className="icon-search"/>
            <input type="search"  {...props}/>
        </label>
    )
}
