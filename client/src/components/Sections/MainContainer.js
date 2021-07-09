import React from 'react'
import ContactList from '../ContactList';
import { FormattedMessage, useIntl } from 'react-intl';
import dogimg from '../../assets/images/dog.png';
import Loader from '../Loader';
import styles from './main-container.module.scss';
export default function MainSection({ data, loading }) {
    const intl = useIntl();
    return (
        <main className={styles.main} role="main">
            <div className={styles.contact_list_container}>
                {
                    loading && !data && (<Loader />)
                }
                {data ? (data.length > 0 ? (
                    <ContactList locale={intl.locale} data={data} />
                ) : (
                    <div className={styles.contact_list__empty}>
                        <img className={styles.image} src={dogimg} alt="dog" />
                        <h2 className={styles.title}>
                            <FormattedMessage id="app-empty-bd-list-heading" />
                        </h2>
                        <h3 className={styles.text_body}>
                            <FormattedMessage id="app-empty-bd-list-body" />
                        </h3>
                    </div>
                )) : null}

            </div>
        </main>
    )
}

//register();
