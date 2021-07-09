import React, { useState } from 'react'
import BackButton, { back } from '../../components/BackButton';
import Container from '../../components/Container';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_INDIVIDUAL_BY_ID_MUTATION } from '../../lib/graphql/mutations';
import { FETCH_INDIVIDUAL_BY_ID_QUERY } from '../../lib/graphql/queries';
import { useParams } from 'react-router-dom';
import AddBD from '../../components/Forms/AddBD';
import styles from './style.module.scss';
export default function Edit() {
    const { id } = useParams();
    const [errors, setErrors] = useState({ update: {}, query: null });
    const [values, setValues] = useState({ name: null, date: null, picture: '/avatars/0' });
    const { data, loading } = useQuery(FETCH_INDIVIDUAL_BY_ID_QUERY, {
        fetchPolicy: 'cache-and-network',
        onCompleted(data) {
            setValues({
                name: data?.getContactById?.name,
                date: new Date(data?.getContactById?.birthdate),
                picture: data?.getContactById?.picture
            })
        },
        onError(e) {
            setErrors({ query: e.message })
        },
        variables: { id }
    })
    const [updateIndividual] = useMutation(UPDATE_INDIVIDUAL_BY_ID_MUTATION, {
        update() {
            back();
        },
        onError(err) {
            setErrors({ update: err?.graphQLErrors[0]?.extensions.errors });
        },
        variables: getRequestVariables()
    });
    function getRequestVariables() {
        let birthdate = null;
        let name = null;
        let picture = null;
        if (values.name !== data?.getContactById?.name) { name = values.name }
        if (values.date !== data?.getContactById?.birthdate) {
            birthdate = values.date
        }
        if (values.picture !== data?.getContactById?.picture) {
            picture = values.picture
        }
        return { id, birthdate, name, picture }
    }
    const handleChange = (value) => {
        setValues({ ...values, ...value});
    }
    const handleSubmit = () => {
        updateIndividual();
    }
    if (errors.query) return (<Error error={errors.query} />)
    if (loading || !values.date) return (<Loader />);
    return (
        <div className={styles.edit}>
            <Container variant="fluid">
                <BackButton />
                <AddBD values={values} onChange={handleChange} onSubmit={handleSubmit} errors={errors.update} />
            </Container>
        </div>
    )
}
