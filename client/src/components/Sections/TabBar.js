import React from 'react'
import Tabs from '../Tabs'
import Link from '../Link';
import Tab from '../Tab'
import { Add as AddIcon, Home as HomeIcon, Search as SearchIcon, Calendar as CalendarIcon } from '../Icons';
import { useHistory, useLocation } from 'react-router-dom';
import FloatingButton from '../FloatingButton';
const tabMappings = [
    '/app',
    '/app/search',
    '/app/events'
]
export default function TabBar() {
    const history = useHistory();
    const { pathname } = useLocation();
    const handleTabChange = (n) => {
        history.push(tabMappings[n], {from: pathname})
    }
    return (
        <div>
            <Link to="/app/add">
                <FloatingButton y={100} color="secondary">
                    <AddIcon />
                </FloatingButton>
            </Link>
            <Tabs active={tabMappings.indexOf(pathname)} onChange={handleTabChange}>
                <Tab icon={<HomeIcon />} text="home" />
                <Tab icon={<SearchIcon />} text="search" />
                <Tab icon={<CalendarIcon />} text="events" />
            </Tabs>
        </div>
    )
}
