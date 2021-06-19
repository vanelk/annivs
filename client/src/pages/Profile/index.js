import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import Avatar from '../../components/Avatar'
import BackButton, { back } from '../../components/BackButton';
import Container from '../../components/Container';
import Button from '../../components/Button';
import BirthdateCard from '../../components/BirthdateCard';
import Loader from '../../components/Loader';
import Error from '../../components/Error'
import { useParams } from 'react-router-dom';
import Link from '../../components/Link';
import { FETCH_INDIVIDUAL_BY_ID_QUERY } from '../../graphql/queries';
import { DELETE_INDIVIDUAL_BY_ID_MUTATION } from '../../graphql/mutations';
import styles from './style.module.scss';
export default function Profile() {
    const { id } = useParams();
    const [errors, setErrors] = useState({ delete: null, query: null })
    const { data, loading } = useQuery(FETCH_INDIVIDUAL_BY_ID_QUERY, {
        fetchPolicy: 'cache-and-network',
        onError(e) {
            setErrors({ query: e.message })
        },
        variables: { id }
    })
    const [deleteIndividual, { loading: deleteLoading }] = useMutation(DELETE_INDIVIDUAL_BY_ID_MUTATION, {
        update() {
            back();
        },
        variables: { id }
    })
    if (loading) return (<Loader />);
    if (errors.query) return (<Error error={errors.query} />)
    const date = new Date(data?.getContactById?.birthdate);
    return (
        <div className={styles.profile}>
            <Container variant="fluid">
                <BackButton />
                <Container>
                    <div className={styles.profile_avatar_wrapper}>
                        <div className={styles.avatar_container}>
                            <Avatar size="md" src={data?.getContactById?.picture} />
                        </div>
                    </div>
                    <div className={styles.small_text}>
                        <Link to={`/app/edit/${id}`} className="link"> Edit </Link>
                    </div>
                    <div className={styles.profile_container}>
                        <h1 className={styles.text_title}> {data?.getContactById?.name} </h1>
                        <h3 className={styles.text_body}>Today is {new Date(new Date() - date).getFullYear() - 1970} y.o</h3>
                        <div className={styles.card_container}>
                            <BirthdateCard date={date} />
                        </div>
                        <div className={styles.btn_container}>
                            <Button onClick={deleteIndividual} loading={deleteLoading ? true : false}>DELETE</Button>
                        </div>
                    </div>
                </Container>
            </Container>
        </div>
    )
}
