import React from 'react';
import { Search as SearchIcon } from '../Icons';
import styles from './style.module.scss';
export default function SearchBar(props) {
    return (
        <label className={styles.search_bar}>
            <SearchIcon/>
            <input type="search" autoComplete="off" {...props}/>
        </label>
    )
}
