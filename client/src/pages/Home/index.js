import React, { useState } from 'react'
import { FETCH_BIRDAYS_DATE_QUERY } from '../../lib/graphql/queries';
import { daysForLocale } from '../../components/Calendar';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import Container from '../../components/Container';
import Error from '../../components/Error';
import { isEqual } from '../../utils/dateUtil';
import { joinStrings } from '../../utils/stringUtil';
import { useQuery } from '@apollo/client';
import styles from '../../components/Calendar/style.module.scss';
import AppBar from '../../components/Sections/AppBar';
import MainContainer from '../../components/Sections/MainContainer';
import TabBar from '../../components/Sections/TabBar';
export default function Home() {
    const [activeDate, setActiveDate] = useState(new Date());
    const intl = useIntl();
    const { loading, data, error } = useQuery(FETCH_BIRDAYS_DATE_QUERY, { variables: { date: activeDate }, fetchPolicy: 'cache-and-network' });
    const startDate = new Date(activeDate)
    const dates = [];
    const weekdays = daysForLocale(intl.locale);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    var title =  <FormattedDate weekday="long" value={activeDate} /> 
    for (let i = 0; i < 7; i++) {
        let d = new Date(startDate);
        d.setDate(d.getDate() + i)
        dates.push(d);
    }
    if (error) return <Error error={error.message} />
    if (isEqual(activeDate, new Date())) title = <FormattedMessage id={"appbar-title"} />
    return (
        <div>
            <Container>
                <AppBar title={title} />
                <div className={styles.grid}>
                    {weekdays.map((day, i) => <div key={i} className={styles.weekday}>{day}</div>)}
                    {dates.map((day, i) =>
                    (<div key={i} onClick={() => setActiveDate(day)} className={styles.date}>
                        <div className={joinStrings(styles.date__text, isEqual(day, activeDate) ? styles.date__active : null)}>
                            {day.getDate()}
                        </div>
                    </div>)
                    )}
                </div>
            </Container>
            <MainContainer locale={intl.locale} data={data?.getBirthdatesByDate} loading={loading} />
            <TabBar/>
        </div>
    )
}
