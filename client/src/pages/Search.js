import React, { useState } from 'react'
import Container from '../components/Container';
import BackButton from '../components/BackButton';
import { useHistory, useLocation } from 'react-router';
import SearchBar from '../components/SearchBar';
import SearchList from '../components/SearchList';
export default function Search() {
    const query = new URLSearchParams(useLocation().search).get("q");
    const history = useHistory();
    const [value, setValue] = useState(query||"");
    const handleChange = (ev)=>{
        setValue(ev.target.value);
    }
    const handleSubmit = (ev) =>{
        ev.preventDefault();
        history.push({
         pathname:"/app/search",
         search:   `?q=${value}`
        })
    }
    return (
        <div className="search">
            <Container variant="fluid">
                <BackButton/>
                <form method="GET" onSubmit={handleSubmit} className="p-3">
                    <SearchBar value={value} name="q" onChange={handleChange} placeholder="Search Name" />
                    {query&&(<SearchList/>)}
                </form>
            </Container>
        </div>
    )
}
