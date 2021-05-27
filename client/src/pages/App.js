import React, { useState } from 'react'
import AppBar from '../components/AppBar'
import Calendar,{ dateToYMD, getDayOfWeek, monthName } from '../components/Calendar'
import Container from '../components/Container'
import MainSection from '../components/MainSection'
import TabBar from '../components/TabBar'
import { useQuery } from '@apollo/client';
import { FETCH_BIRDAYS_DATE_QUERY, FETCH_BIRTHDAYS_MONTH_QUERY } from '../graphql/queries';
import ErrorHandler from '../components/ErrorHandler'
import CalendarList from '../components/CalendarList'

function App() {
    const [activeDate, setActiveDate] = useState(new Date());
    const [ activeTab, setActiveTab ] = useState(1);
    var query = FETCH_BIRDAYS_DATE_QUERY;
    let variables = { date: dateToYMD(activeDate) };
    if(activeTab === 2){
        query = FETCH_BIRTHDAYS_MONTH_QUERY
        let from = dateToYMD(new Date (new Date(activeDate).setDate(1)))
        let to = dateToYMD(new Date(activeDate.getFullYear(), activeDate.getMonth()+1, 0))
        variables = {from, to}
    } 
    const { loading, data, error } = useQuery(query, { variables });
    const handleTabChange = (n) => {
        if(n === 1) setActiveDate(new Date());
        setActiveTab(n);
    }
    const handleDateChange = (date) => {
        setActiveDate(date);
        if(activeTab === 2){
            //TODO: Scroll to the person item
        }
    }
    const title = activeTab === 1? getDayOfWeek(activeDate) : monthName(activeDate) + " " + activeDate.getFullYear();
    if(error) return (<ErrorHandler error={error.message}/>)
    return (
        <div className="app">
            <Container>
                <AppBar title={title}></AppBar>
                <Calendar variant={activeTab === 2 ? "lg" : ""} value={activeDate} onChange={handleDateChange}/>
            </Container>
            <MainSection>
                <div className="px-5 py-6">
                    <CalendarList data={data} loading={loading}/>
                </div>
            </MainSection>
            <TabBar onChange={handleTabChange} />
        </div>
    )
}

export default App;