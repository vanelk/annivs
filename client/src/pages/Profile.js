import React, { useState } from 'react'
import Avatar from '../components/Avatar'
import BackButton, { back } from '../components/BackButton';
import Container from '../components/Container';
import Button from '../components/Button';
import BirthdateCard from '../components/BirthdateCard';
import Loader from '../components/Loader';
import Error from '../components/Error'
import Link from '../components/Link';
import { useParams } from 'react-router-dom';
import { FETCH_INDIVIDUAL_BY_ID_QUERY } from '../graphql/queries';
import { DELETE_INDIVIDUAL_BY_ID_MUTATION } from '../graphql/mutations';
import { useMutation, useQuery } from '@apollo/client';
import './style.scss';
export default function Profile() {
    const { id } = useParams();
    const [errors, setErrors] = useState({ delete: null, query: null })
    const { data, loading } = useQuery(FETCH_INDIVIDUAL_BY_ID_QUERY, {
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
        <div className="profile">
            <Container variant="fluid">
                <BackButton />
                <Container>
                    <div className="profile_avatar_wrapper">
                        <div className="avatar-container">
                            <Avatar variant="md" src={data?.getContactById?.picture} />
                        </div>
                    </div>
                    <div className="small_text">
                        <Link to={`/app/edit/${id}`} className="link"> Edit </Link>
                    </div>
                    <div className="profile__container">
                        <h1 className="title"> {data?.getContactById?.name} </h1>
                        <h3 className="text-body">Today is {new Date(new Date() - date).getFullYear() - 1970} y.o</h3>
                        <BirthdateCard date={date} className="bd-card" />
                        <div className="button-container">
                            <Button onClick={deleteIndividual} loading={deleteLoading ? true : false}>DELETE</Button>
                        </div>
                    </div>
                </Container>
            </Container>
        </div>
    )
}
